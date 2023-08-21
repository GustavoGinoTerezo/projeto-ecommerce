import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncoesAdministradorComponent } from './funcoes-administrador.component';

describe('FuncoesAdministradorComponent', () => {
  let component: FuncoesAdministradorComponent;
  let fixture: ComponentFixture<FuncoesAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncoesAdministradorComponent]
    });
    fixture = TestBed.createComponent(FuncoesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
