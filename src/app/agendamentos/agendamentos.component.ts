import { Component, OnInit } from '@angular/core';

import { Agendamento } from './agendamento.model';
import { AgendamentosService } from './agendamentos.service';

@Component({
  selector: 'app-agedamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit{

    agendamentos: Agendamento[];
    selectedItemAgenda: Agendamento;

    constructor(private agendamentoServer: AgendamentosService){}

    ngOnInit(): void {
        this.agendamentos = this.agendamentoServer.getAgendamentos(); 
        this.selectedItemAgenda = null;
    }

    updateSelectedAgendamento(){
        this.selectedItemAgenda = this.agendamentoServer.getSelectedAgendamento();
    }

    updateAgendamentoValues(){
        this.agendamentos = this.agendamentoServer.getAgendamentos(); 
        this.updateSelectedAgendamento();     
    }

    OnSelectedItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            this.agendamentoServer.setSelectedAgendamento(agendamentoData);
            this.updateSelectedAgendamento();
        }
    }

    OnDeleteItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            this.agendamentoServer.deleteItemAgenda(agendamentoData);
            this.updateAgendamentoValues();
        }
    }

    OnUpdateItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            this.agendamentoServer.updateItemAgenda(agendamentoData);
            this.updateAgendamentoValues(); 
        }
    }

    OnInsertItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            this.agendamentoServer.insertItemAgenda(agendamentoData);
            this.updateAgendamentoValues(); 
        }
    }

    OnSelectItem(){
        this.agendamentoServer.setSelectedAgendamento(null);
    }
}