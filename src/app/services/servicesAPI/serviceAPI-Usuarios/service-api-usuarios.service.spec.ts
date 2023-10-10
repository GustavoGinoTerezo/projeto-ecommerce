import { TestBed } from '@angular/core/testing';

import { ServiceApiUsuariosService } from './service-api-usuarios.service';

describe('ServiceApiUsuariosService', () => {
  let service: ServiceApiUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
