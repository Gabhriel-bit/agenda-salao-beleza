import { Component } from '@angular/core';
import { Agendamento } from './agendamentos/agendamento.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  txtCapHeader = 'Agenda para Salão de Beleza';
}
