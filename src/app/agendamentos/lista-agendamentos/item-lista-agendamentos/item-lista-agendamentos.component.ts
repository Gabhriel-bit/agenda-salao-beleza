import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Agendamento } from '../../agendamento.model';

@Component({
  selector: 'app-item-lista-agendamentos',
  templateUrl: './item-lista-agendamentos.component.html',
  styleUrls: ['./item-lista-agendamentos.component.css']
})
export class ItemListaAgendamentosComponent {

  @Output('selectedItemAgenda') selectedItemLista = new EventEmitter<Agendamento>();
  @Input('agendamentoItem') agendamento: Agendamento;

  onClickItemLista(){
    this.selectedItemLista.emit(this.agendamento);
  }
}
