import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreEmContatoComponent } from './entre-em-contato.component';

describe('EntreEmContatoComponent', () => {
  let component: EntreEmContatoComponent;
  let fixture: ComponentFixture<EntreEmContatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntreEmContatoComponent]
    });
    fixture = TestBed.createComponent(EntreEmContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
