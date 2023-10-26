import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AgendamentosService } from '../agendamentos.service';
import { ServicosService } from '../../servicos/servico.service';
import { Servico } from '../../servicos/servico.model';

import { Agendamento } from '../agendamento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-agendamentos',
  templateUrl: './setting-agendamentos.component.html',
  styleUrls: ['./setting-agendamentos.component.css']
})
export class SettingAgendamentosComponent implements OnInit{
  
  listaServicosAdicionados : Servico[] = [];
  listaServicosDisponiveis : Servico[] = [];

  canSubmit: Boolean = false;
  camposValidos: string = '';

  private agendamentoService: AgendamentosService;
  private servicoService: ServicosService;
  private router: Router;

  newAgendamento: {codigo: number, data: string, hora: string,
                   cliente: string, funcionario: string, hasPref: Boolean};

  @ViewChild('data') dataEl: ElementRef;
  @ViewChild('hora') horaEl: ElementRef;
  @ViewChild('cliente') clienteEl: ElementRef;
  @ViewChild('funcionario') funcionarioEl: ElementRef;

  constructor(agendamentoService: AgendamentosService,
              servicoService: ServicosService,
              router: Router){
    this.agendamentoService = agendamentoService;
    this.servicoService = servicoService;
    this.router = router;
  }

  ngOnInit(): void {
    this.camposValidos = '';
    let agendamento = this.agendamentoService.getSelectedAgendamento();

    if ((agendamento === undefined) || (agendamento === null)){
      agendamento = Agendamento.emptyConstructor();
      this.camposValidos = '345';
    }

    this.newAgendamento = {
      codigo: agendamento.getCodigo,
      data: agendamento.getFormatedDate('YYYY-MM-DD'),
      hora: agendamento.getFormatedDate('HH:mm'),
      cliente: agendamento.getNomeCliente,
      funcionario: agendamento.getNomeFuncionario,
      hasPref: agendamento.getHasPreferenciaAtt
    };

    this.servicoService.getServicos()
      .filter(item => !agendamento.getServicos.find(item1 => item1.getCodigo === item.getCodigo) )
      .forEach(item => this.listaServicosDisponiveis.push(item.clone()));

    this.listaServicosAdicionados = agendamento.getServicos.slice();

    this.validateSubmit();
  }

  changeColorError(elemento: ElementRef, isDefault: Boolean){
    if(isDefault){
      elemento.nativeElement.style.backgroundColor = 'transparent';
      return;
    }

    elemento.nativeElement.style.backgroundColor = 'rgb(245, 204, 204)';
  }

  validateData(){
    const strDate: string = this.dataEl.nativeElement.value;

    if (strDate === ''){
      this.changeColorError(this.dataEl, false);
      this.camposValidos += '1';
      return false;
    }
    
    this.changeColorError(this.dataEl, true);
    this.camposValidos = this.camposValidos.replace('1', '');
    this.validateSubmit();
    return true;
  }

  validateHora(){
    if (this.newAgendamento.hora === ''){
      this.changeColorError(this.horaEl, false);
      this.camposValidos += '2';
      return false;
    }
    
    this.changeColorError(this.horaEl, true);
    this.camposValidos = this.camposValidos.replace('2', '');
    this.validateSubmit();
    return true;
  }

  validateCliente(){
    if (this.newAgendamento.cliente === ''){
      this.changeColorError(this.clienteEl, false);
      this.camposValidos += '3';
      return false;
    }
    
    this.changeColorError(this.clienteEl, true);
    this.camposValidos = this.camposValidos.replace('3', '');
    this.validateSubmit();
    return true;
  }

  validateFuncionario(){
    if (this.newAgendamento.funcionario === ''){
      this.changeColorError(this.funcionarioEl, false);
      this.camposValidos += '4';
      return false;
    }
    
    this.changeColorError(this.funcionarioEl, true);
    this.camposValidos = this.camposValidos.replace('4', '');
    this.validateSubmit();
    return true;
  }

  validateServicos(){
    if (this.listaServicosAdicionados.length === 0){
      this.camposValidos += '5';
      return false;
    }
    
    this.camposValidos = this.camposValidos.replace('5', '');
    this.validateSubmit();
    return true;
  }

  validateSubmit(){
    this.canSubmit = this.camposValidos === '';
  }

  getStrToDate() {
    const [horas, minutos] = this.newAgendamento.hora.split(':');
    const [ano, mes, dia] = this.newAgendamento.data.split('-');;

    const data = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10),
      parseInt(horas, 10),
      parseInt(minutos, 10)
    );
    
    return data;
  }

  onClickSalvar(){
    if (!this.validateData())        { return; }
    if (!this.validateHora())        { return; }
    if (!this.validateCliente())     { return; }
    if (!this.validateFuncionario()) { return; }
    if (!this.validateServicos())    { return; }

    const newAgendamento = new Agendamento(
      (this.newAgendamento.codigo === 0) ? this.agendamentoService.getNextCodigo() 
                                         : this.newAgendamento.codigo,
      this.getStrToDate(),
      this.newAgendamento.cliente,
      this.newAgendamento.funcionario,
      this.newAgendamento.hasPref,
      this.listaServicosAdicionados.slice()
    );

    if (this.newAgendamento.codigo === 0) { 
      this.agendamentoService.insertItemAgenda(newAgendamento);
    } else {
      this.agendamentoService.updateItemAgenda(newAgendamento);
    }

    this.router.navigate(['']);
  }

  onClickCancelar(){
    this.router.navigate(['']);
  }

  OnSelectedItemServicoAdicionado(servicosAdicionadosAtual: Servico[]) {
    this.ajustarLista(servicosAdicionadosAtual, 
                      this.listaServicosDisponiveis);

    this.listaServicosAdicionados = servicosAdicionadosAtual.slice();
    this.validateServicos();
  }

  OnSelectedItemServicoDisponivel(servicosDisponiveisAtual: Servico[]){
    this.ajustarLista(servicosDisponiveisAtual, 
                      this.listaServicosAdicionados);

    this.listaServicosDisponiveis = servicosDisponiveisAtual.slice();
    this.validateServicos();
  }

  ajustarLista(ListaAtual: Servico[], ListaToAdd: Servico[]){
    this.servicoService.getServicos()
      .filter(item => !ListaAtual.find(item1 => item1.getCodigo === item.getCodigo) &&
                      !ListaToAdd.find(item2 => item2.getCodigo === item.getCodigo) )
      .forEach(item => ListaToAdd.push(item) );
  }
}