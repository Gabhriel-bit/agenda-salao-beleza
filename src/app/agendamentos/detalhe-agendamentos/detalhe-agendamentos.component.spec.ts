import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheAgendamentosComponent } from './detalhe-agendamentos.component';

describe('DetalheAgendamentosComponent', () => {
  let component: DetalheAgendamentosComponent;
  let fixture: ComponentFixture<DetalheAgendamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheAgendamentosComponent]
    });
    fixture = TestBed.createComponent(DetalheAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
