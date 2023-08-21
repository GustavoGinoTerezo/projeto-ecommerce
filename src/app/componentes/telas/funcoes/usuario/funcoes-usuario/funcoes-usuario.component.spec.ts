import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncoesUsuarioComponent } from './funcoes-usuario.component';

describe('FuncoesUsuarioComponent', () => {
  let component: FuncoesUsuarioComponent;
  let fixture: ComponentFixture<FuncoesUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncoesUsuarioComponent]
    });
    fixture = TestBed.createComponent(FuncoesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
