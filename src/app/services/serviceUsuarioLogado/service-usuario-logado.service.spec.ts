import { TestBed } from '@angular/core/testing';

import { ServiceUsuarioLogadoService } from './service-usuario-logado.service';

describe('ServiceUsuarioLogadoService', () => {
  let service: ServiceUsuarioLogadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUsuarioLogadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
