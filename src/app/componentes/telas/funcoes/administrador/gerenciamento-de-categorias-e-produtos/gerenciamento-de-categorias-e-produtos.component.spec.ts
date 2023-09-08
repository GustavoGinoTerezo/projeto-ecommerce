import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeCategoriasEProdutosComponent } from './gerenciamento-de-categorias-e-produtos.component';

describe('GerenciamentoDeCategoriasEProdutosComponent', () => {
  let component: GerenciamentoDeCategoriasEProdutosComponent;
  let fixture: ComponentFixture<GerenciamentoDeCategoriasEProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeCategoriasEProdutosComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeCategoriasEProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
