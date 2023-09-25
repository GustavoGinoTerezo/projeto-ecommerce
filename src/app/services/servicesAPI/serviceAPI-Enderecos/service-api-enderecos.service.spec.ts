import { TestBed } from '@angular/core/testing';

import { ServiceApiEnderecosService } from './service-api-enderecos.service';

describe('ServiceApiEnderecosService', () => {
  let service: ServiceApiEnderecosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiEnderecosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
