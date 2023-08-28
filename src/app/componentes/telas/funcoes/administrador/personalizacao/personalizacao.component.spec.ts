import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizacaoComponent } from './personalizacao.component';

describe('PersonalizacaoComponent', () => {
  let component: PersonalizacaoComponent;
  let fixture: ComponentFixture<PersonalizacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalizacaoComponent]
    });
    fixture = TestBed.createComponent(PersonalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
