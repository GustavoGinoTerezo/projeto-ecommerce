import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusaoDeCompraComponent } from './conclusao-de-compra.component';

describe('ConclusaoDeCompraComponent', () => {
  let component: ConclusaoDeCompraComponent;
  let fixture: ComponentFixture<ConclusaoDeCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConclusaoDeCompraComponent]
    });
    fixture = TestBed.createComponent(ConclusaoDeCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
