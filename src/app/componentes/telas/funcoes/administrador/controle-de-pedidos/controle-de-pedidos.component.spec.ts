import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleDePedidosComponent } from './controle-de-pedidos.component';

describe('ControleDePedidosComponent', () => {
  let component: ControleDePedidosComponent;
  let fixture: ComponentFixture<ControleDePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControleDePedidosComponent]
    });
    fixture = TestBed.createComponent(ControleDePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
