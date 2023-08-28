import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosDeVendasComponent } from './relatorios-de-vendas.component';

describe('RelatoriosDeVendasComponent', () => {
  let component: RelatoriosDeVendasComponent;
  let fixture: ComponentFixture<RelatoriosDeVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatoriosDeVendasComponent]
    });
    fixture = TestBed.createComponent(RelatoriosDeVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
