import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Servico } from '../../../servicos/servico.model';

@Component({
  selector: 'app-lista-servicos-agenda',
  templateUrl: './lista-servicos-agenda.component.html',
  styleUrls: ['./lista-servicos-agenda.component.css']
})
export class ListaServicosAgendaComponent {

  @Output('selectedItemServico') selectedItemLista = new EventEmitter<Servico[]>();
  @Input('listaServicos') servicos: Servico[];

  OnSelectedItemServico(servicoData: Servico){
    this.servicos = this.servicos.filter(item => item.getCodigo !== servicoData.getCodigo);
    this.selectedItemLista.emit(this.servicos);
  }

}