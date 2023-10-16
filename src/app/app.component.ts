import { Component } from '@angular/core';

import { AgendamentosService } from './agendamentos/agendamentos-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AgendamentosService]
})
export class AppComponent {

  txtCapHeader = 'Agenda para Salão de Beleza';
}
