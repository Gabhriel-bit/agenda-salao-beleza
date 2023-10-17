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
  private agendamento: Agendamento;

  newAgendamento: {codigo: number, data: Date, hora: string,
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
    this.newAgendamento = {
      codigo: 0,
      data: null,
      hora: '',
      cliente: '',
      funcionario: '',
      hasPref: false,
      servicos: ''
    };

    this.camposValidos = '12345';
    this.agendamento = this.agendamentoService.getSelectedAgendamento();

    if ((this.agendamento === undefined) || (this.agendamento === null)){
      this.agendamento = null;
    } else {
      this.newAgendamento = {
        codigo: this.agendamento.getCodigo(),
        data: this.agendamento.getDataHora(),
        hora: this.agendamento.getFormatedDate('HH:mm'),
        cliente: this.agendamento.getNomeCliente(),
        funcionario: this.agendamento.getNomeFuncionario(),
        hasPref: this.agendamento.getHasPreferenciaAtt(),
        servicos: this.agendamento.getServicos().join(';')
      };
      this.camposValidos = '';
    }
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
    const strDate: string = this.dataEl.nativeElement.value;
    const [ano, mes, dia] = strDate.split('-');

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
      (this.agendamento === null) ? this.agendamentoService.getNextCodigo() 
                                  : this.agendamento.getCodigo(),
      this.getStrToDate(),
      this.newAgendamento.cliente,
      this.newAgendamento.funcionario,
      this.newAgendamento.hasPref,
      this.newAgendamento.servicos.split(';')
    );

    if (this.agendamento === null) { 
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
