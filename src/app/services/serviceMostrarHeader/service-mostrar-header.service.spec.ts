import { TestBed } from '@angular/core/testing';

import { ServiceMostrarHeaderService } from './service-mostrar-header.service';

describe('ServiceMostrarHeaderService', () => {
  let service: ServiceMostrarHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMostrarHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
