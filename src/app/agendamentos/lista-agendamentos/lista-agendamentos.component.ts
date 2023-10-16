import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Agendamento } from '../agendamento.model';

@Component({
  selector: 'app-lista-agendamentos',
  templateUrl: './lista-agendamentos.component.html',
  styleUrls: ['./lista-agendamentos.component.css']
})
export class ListaAgendamentosComponent {
  txtBtnUpdate = 'Editar';
  txtBtnDelete = 'Deletar';

  @Output('selectedItemAgenda') selectedItemLista = new EventEmitter<Agendamento>();
  @Input('listaAgendamentos') agendamentos: Agendamento[];

  OnSelectedItemAgenda(agedamentoData: Agendamento){
    this.selectedItemLista.emit(agedamentoData);
  }
}