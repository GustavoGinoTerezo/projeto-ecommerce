import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaContaComponent } from './minha-conta.component';

describe('MinhaContaComponent', () => {
  let component: MinhaContaComponent;
  let fixture: ComponentFixture<MinhaContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinhaContaComponent]
    });
    fixture = TestBed.createComponent(MinhaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
