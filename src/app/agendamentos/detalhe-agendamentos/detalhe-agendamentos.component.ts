import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Agendamento } from '../agendamento.model';
import { AgendamentosService } from '../agendamentos-service';

@Component({
  selector: 'app-detalhe-agendamentos',
  templateUrl: './detalhe-agendamentos.component.html',
  styleUrls: ['./detalhe-agendamentos.component.css']
})
export class DetalheAgendamentosComponent implements OnInit{

  @Output('deleteItemAgenda') deleteItemAgenda = new EventEmitter<Agendamento>();
  @Input('selectedItemAgenda') agendamento: Agendamento;
  private 


  constructor(private agendamentoServer: AgendamentosService){}

  isInvalidAgendamento(){
    return (this.agendamento === null) || (this.agendamento === undefined);
  }

  OnClickDelete(){
    console.log(this.agendamento.getCodigo);
    this.deleteItemAgenda.emit(this.agendamento);
  }

  OnSelectItem(){
    this.agendamentoServer.setSelectedAgendamento(this.agendamento);
    console.log('detalhe ' + this.agendamento.getNomeCliente);
  }

  ngOnInit(): void {
      
  }
}

