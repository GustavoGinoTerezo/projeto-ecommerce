import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeEstoqueComponent } from './gerenciamento-de-estoque.component';

describe('GerenciamentoDeEstoqueComponent', () => {
  let component: GerenciamentoDeEstoqueComponent;
  let fixture: ComponentFixture<GerenciamentoDeEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeEstoqueComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
