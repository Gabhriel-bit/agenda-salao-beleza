import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent {

  txtBtnSearch = 'BUSCAR';
  txtBtnAdd = 'ADICIONAR';
  txtCapHeader = 'Lista de Agendamentos'

  FSearchValue = '';

  onClickAdd() {
    //implementar a chamada da tela de cadastro
  }

  onClickSearch() {
    //implementar filtro do grid
  }

  hasSearchValue() {
    return this.FSearchValue != '';
  }
}
