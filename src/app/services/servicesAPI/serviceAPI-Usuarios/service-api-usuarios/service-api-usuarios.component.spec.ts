import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceApiUsuariosComponent } from './service-api-usuarios.component';

describe('ServiceApiUsuariosComponent', () => {
  let component: ServiceApiUsuariosComponent;
  let fixture: ComponentFixture<ServiceApiUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceApiUsuariosComponent]
    });
    fixture = TestBed.createComponent(ServiceApiUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
