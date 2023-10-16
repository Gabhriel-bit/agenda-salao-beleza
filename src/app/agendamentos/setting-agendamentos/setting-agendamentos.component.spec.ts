import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAgendamentosComponent } from './setting-agendamentos.component';

describe('SettingAgendamentosComponent', () => {
  let component: SettingAgendamentosComponent;
  let fixture: ComponentFixture<SettingAgendamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingAgendamentosComponent]
    });
    fixture = TestBed.createComponent(SettingAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
