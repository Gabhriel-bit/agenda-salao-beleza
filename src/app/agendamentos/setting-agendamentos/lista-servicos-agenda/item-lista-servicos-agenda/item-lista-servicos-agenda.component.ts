import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Servico } from '../../../../servicos/servico.model';

@Component({
  selector: 'app-item-lista-servicos-agenda',
  templateUrl: './item-lista-servicos-agenda.component.html',
  styleUrls: ['./item-lista-servicos-agenda.component.css']
})
export class ItemListaServicosAgendaComponent {
  
  @Output('selectedItemServico') selectedItemLista = new EventEmitter<Servico>();
  @Input('servicoItem') servico: Servico;

  onClickItemLista(){
    this.selectedItemLista.emit(this.servico);
  }
}
