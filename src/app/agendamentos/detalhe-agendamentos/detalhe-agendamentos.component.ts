import { Component, Input, OnInit } from '@angular/core';

import { Agendamento } from '../agendamento.model';

@Component({
  selector: 'app-detalhe-agendamentos',
  templateUrl: './detalhe-agendamentos.component.html',
  styleUrls: ['./detalhe-agendamentos.component.css']
})
export class DetalheAgendamentosComponent implements OnInit{
  @Input('selectedItemAgenda') agendamento: Agendamento;

  isInvalidAgendamento(){
    return (this.agendamento === null) || (this.agendamento === undefined);
  }

  ngOnInit(): void {
      
  }
}
