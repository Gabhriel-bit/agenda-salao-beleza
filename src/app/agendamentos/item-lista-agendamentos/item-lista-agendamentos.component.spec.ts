import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListaAgendamentosComponent } from './item-lista-agendamentos.component';

describe('ItemListaAgendamentosComponent', () => {
  let component: ItemListaAgendamentosComponent;
  let fixture: ComponentFixture<ItemListaAgendamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListaAgendamentosComponent]
    });
    fixture = TestBed.createComponent(ItemListaAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
