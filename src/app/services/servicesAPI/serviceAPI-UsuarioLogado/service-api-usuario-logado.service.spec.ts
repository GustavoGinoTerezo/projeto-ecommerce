import { TestBed } from '@angular/core/testing';

import { ServiceApiUsuarioLogadoService } from './service-api-usuario-logado.service';

describe('ServiceApiUsuarioLogadoService', () => {
  let service: ServiceApiUsuarioLogadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiUsuarioLogadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
