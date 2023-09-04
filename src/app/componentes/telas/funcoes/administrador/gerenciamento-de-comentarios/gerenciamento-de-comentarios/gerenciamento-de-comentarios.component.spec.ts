import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeComentariosComponent } from './gerenciamento-de-comentarios.component';

describe('GerenciamentoDeComentariosComponent', () => {
  let component: GerenciamentoDeComentariosComponent;
  let fixture: ComponentFixture<GerenciamentoDeComentariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeComentariosComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
