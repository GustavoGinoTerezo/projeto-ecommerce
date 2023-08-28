import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDeEstoqueComponent } from './entrada-de-estoque.component';

describe('EntradaDeEstoqueComponent', () => {
  let component: EntradaDeEstoqueComponent;
  let fixture: ComponentFixture<EntradaDeEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaDeEstoqueComponent]
    });
    fixture = TestBed.createComponent(EntradaDeEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
