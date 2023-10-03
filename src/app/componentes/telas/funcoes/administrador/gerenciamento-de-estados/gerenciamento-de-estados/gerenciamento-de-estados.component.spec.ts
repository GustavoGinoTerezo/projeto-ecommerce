import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeEstadosComponent } from './gerenciamento-de-estados.component';

describe('GerenciamentoDeEstadosComponent', () => {
  let component: GerenciamentoDeEstadosComponent;
  let fixture: ComponentFixture<GerenciamentoDeEstadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeEstadosComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
