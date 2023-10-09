import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoDeCaixasComponent } from './gerenciamento-de-caixas.component';

describe('GerenciamentoDeCaixasComponent', () => {
  let component: GerenciamentoDeCaixasComponent;
  let fixture: ComponentFixture<GerenciamentoDeCaixasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoDeCaixasComponent]
    });
    fixture = TestBed.createComponent(GerenciamentoDeCaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
