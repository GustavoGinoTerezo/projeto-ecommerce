import { TestBed } from '@angular/core/testing';

import { ServiceApiUsuarioService } from './service-api-usuario.service';

describe('ServiceApiUsuarioService', () => {
  let service: ServiceApiUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
