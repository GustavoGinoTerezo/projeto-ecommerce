import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosDeVendasEControleDePedidosComponent } from './relatorios-de-vendas-e-controle-de-pedidos.component';

describe('RelatoriosDeVendasEControleDePedidosComponent', () => {
  let component: RelatoriosDeVendasEControleDePedidosComponent;
  let fixture: ComponentFixture<RelatoriosDeVendasEControleDePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatoriosDeVendasEControleDePedidosComponent]
    });
    fixture = TestBed.createComponent(RelatoriosDeVendasEControleDePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
