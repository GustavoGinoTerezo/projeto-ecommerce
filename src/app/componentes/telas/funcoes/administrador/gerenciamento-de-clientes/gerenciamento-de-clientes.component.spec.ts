import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeClientesComponent } from './gerenciamento-de-clientes.component';

describe('GerenciamentoDeClientesComponent', () => {
  let component: GerenciamentoDeClientesComponent;
  let fixture: ComponentFixture<GerenciamentoDeClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeClientesComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
