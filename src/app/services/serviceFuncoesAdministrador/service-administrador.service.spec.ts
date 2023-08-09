import { TestBed } from '@angular/core/testing';

import { ServiceAdministradorService } from './service-administrador.service';

describe('ServiceAdministradorService', () => {
  let service: ServiceAdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
