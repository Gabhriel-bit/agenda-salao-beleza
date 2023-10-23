import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AgendamentosService } from '../agendamentos-service';
import { Agendamento } from '../agendamento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-agendamentos',
  templateUrl: './setting-agendamentos.component.html',
  styleUrls: ['./setting-agendamentos.component.css']
})
export class SettingAgendamentosComponent implements OnInit{
  
  canSubmit: Boolean = false;
  camposValidos: string = '';

  private agendamentoService: AgendamentosService;
  private router: Router;

  newAgendamento: {codigo: number, data: string, hora: string,
                   cliente: string, funcionario: string, hasPref: Boolean,
                   servicos: string};

  @ViewChild('data') dataEl: ElementRef;
  @ViewChild('hora') horaEl: ElementRef;
  @ViewChild('cliente') clienteEl: ElementRef;
  @ViewChild('funcionario') funcionarioEl: ElementRef;
  @ViewChild('servicos') serviceEl: ElementRef;

  constructor(agendamentoService: AgendamentosService,
              router: Router){
    this.agendamentoService = agendamentoService;
    this.router = router;
  }

  ngOnInit(): void {
    this.camposValidos = '';
    let agendamento = this.agendamentoService.getSelectedAgendamento();

    if ((agendamento === undefined) || (agendamento === null)){
      agendamento = Agendamento.emptyConstructor();
      this.camposValidos = '12345';
    }

    this.newAgendamento = {
      codigo: agendamento.getCodigo,
      data: agendamento.getFormatedDate('YYYY-MM-DD'),
      hora: agendamento.getFormatedDate('HH:mm'),
      cliente: agendamento.getNomeCliente,
      funcionario: agendamento.getNomeFuncionario,
      hasPref: agendamento.getHasPreferenciaAtt,
      servicos: agendamento.getServicos.join(';')
    };
    
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
    //this.camposValidos.match
    if (this.newAgendamento.servicos === ''){
      this.changeColorError(this.serviceEl, false);
      this.camposValidos += '5';
      return false;
    }
    
    this.changeColorError(this.serviceEl, true);
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
      this.newAgendamento.servicos.split(';')
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

}
