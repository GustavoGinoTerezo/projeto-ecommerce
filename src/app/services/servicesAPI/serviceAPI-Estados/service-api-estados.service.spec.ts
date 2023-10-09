import { TestBed } from '@angular/core/testing';

import { ServiceApiEstadosService } from './service-api-estados.service';

describe('ServiceApiEstadosService', () => {
  let service: ServiceApiEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
