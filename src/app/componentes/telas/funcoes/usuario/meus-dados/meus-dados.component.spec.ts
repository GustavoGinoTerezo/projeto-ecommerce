import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusDadosComponent } from './meus-dados.component';

describe('MeusDadosComponent', () => {
  let component: MeusDadosComponent;
  let fixture: ComponentFixture<MeusDadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusDadosComponent]
    });
    fixture = TestBed.createComponent(MeusDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
