import { TestBed } from '@angular/core/testing';

import { ServiceEstadosService } from './service-estados.service';

describe('ServiceEstadosService', () => {
  let service: ServiceEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
