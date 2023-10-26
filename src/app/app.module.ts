import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';

import { ErrorHighlight } from './utils/error-highlight';

import { MenuFooterComponent } from './menus/menu-footer/menu-footer.component';
import { MenuHeaderComponent } from './menus/menu-header/menu-header.component';

import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { DetalheAgendamentosComponent } from './agendamentos/detalhe-agendamentos/detalhe-agendamentos.component';
import { ListaAgendamentosComponent } from './agendamentos/lista-agendamentos/lista-agendamentos.component';
import { ItemListaAgendamentosComponent } from './agendamentos/lista-agendamentos/item-lista-agendamentos/item-lista-agendamentos.component';
import { SettingAgendamentosComponent } from './agendamentos/setting-agendamentos/setting-agendamentos.component';
import { ListaServicosAgendaComponent } from './agendamentos/setting-agendamentos/lista-servicos-agenda/lista-servicos-agenda.component';
import { ItemListaServicosAgendaComponent } from './agendamentos/setting-agendamentos/lista-servicos-agenda/item-lista-servicos-agenda/item-lista-servicos-agenda.component';

import { ServicosComponent } from './servicos/servicos.component';

const appRoutes: Routes = [
  {path: '', component: AgendamentosComponent},
  {path: 'update-agendamento', component: SettingAgendamentosComponent},
  {path: 'insert-agendamento', component: SettingAgendamentosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuFooterComponent,
    MenuHeaderComponent,
    AgendamentosComponent,
    ItemListaAgendamentosComponent,
    ListaAgendamentosComponent,
    ItemListaAgendamentosComponent,
    DetalheAgendamentosComponent,
    ErrorHighlight,
    SettingAgendamentosComponent,
    ServicosComponent,
    ListaServicosAgendaComponent,
    ItemListaServicosAgendaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
