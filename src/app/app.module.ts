import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { ListaAgendamentosComponent } from './agendamentos/lista-agendamentos/lista-agendamentos.component';
import { ItemListaAgendamentosComponent } from './agendamentos/item-lista-agendamentos/item-lista-agendamentos.component';
import { DetalheAgendamentosComponent } from './agendamentos/detalhe-agendamentos/detalhe-agendamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuFooterComponent,
    MenuHeaderComponent,
    AgendamentosComponent,
    ItemListaAgendamentosComponent,
    ListaAgendamentosComponent,
    ItemListaAgendamentosComponent,
    DetalheAgendamentosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
