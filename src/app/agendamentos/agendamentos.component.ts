import { Component } from '@angular/core';

import { Agendamento } from './agendamento.model';

@Component({
  selector: 'app-agedamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent {

    agendamentos: Agendamento[] = [
        new Agendamento(1, new Date(), 'Gabhriel', 'Juliana', true,
                        ['Corte de cabelo', 'Barba']),
        new Agendamento(2, new Date(), 'Rodrigo', 'Juliana', false,
                        ['Barba']),
        new Agendamento(3, new Date(), 'Carlos', 'Carmem', false,
                        ['Platinar'])
      ]
    
    selectedItemAgenda: Agendamento = this.agendamentos.length > 0 ? this.agendamentos[0] : null;

    onSelectedItemAgenda(agedamentoData: Agendamento){
        this.selectedItemAgenda = agedamentoData;
    }
}
