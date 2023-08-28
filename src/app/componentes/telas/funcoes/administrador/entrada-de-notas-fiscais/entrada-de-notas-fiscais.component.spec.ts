import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDeNotasFiscaisComponent } from './entrada-de-notas-fiscais.component';

describe('EntradaDeNotasFiscaisComponent', () => {
  let component: EntradaDeNotasFiscaisComponent;
  let fixture: ComponentFixture<EntradaDeNotasFiscaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaDeNotasFiscaisComponent]
    });
    fixture = TestBed.createComponent(EntradaDeNotasFiscaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
