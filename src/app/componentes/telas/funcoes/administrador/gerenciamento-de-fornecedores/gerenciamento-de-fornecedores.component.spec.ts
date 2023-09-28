import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeFornecedoresComponent } from './gerenciamento-de-fornecedores.component';

describe('GerenciamentoDeFornecedoresComponent', () => {
  let component: GerenciamentoDeFornecedoresComponent;
  let fixture: ComponentFixture<GerenciamentoDeFornecedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeFornecedoresComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
