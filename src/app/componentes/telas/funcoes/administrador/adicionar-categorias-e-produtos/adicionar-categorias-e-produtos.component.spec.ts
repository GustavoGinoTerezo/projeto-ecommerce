import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarCategoriasEProdutosComponent } from './adicionar-categorias-e-produtos.component';

describe('AdicionarCategoriasEProdutosComponent', () => {
  let component: AdicionarCategoriasEProdutosComponent;
  let fixture: ComponentFixture<AdicionarCategoriasEProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarCategoriasEProdutosComponent]
    });
    fixture = TestBed.createComponent(AdicionarCategoriasEProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
