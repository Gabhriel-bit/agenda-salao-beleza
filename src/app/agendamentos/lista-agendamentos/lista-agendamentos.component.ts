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

  onClickItemLista(selectedItem: Agendamento){
    this.selectedItemLista.emit(
      new Agendamento(
        selectedItem.getCodigo(),
        selectedItem.getDataHora(),
        selectedItem.getNomeCliente(),
        selectedItem.getNomeFuncionario(),
        selectedItem.getHasPreferenciaAtt(),
        selectedItem.getServicos()
      )
    );
  }
}