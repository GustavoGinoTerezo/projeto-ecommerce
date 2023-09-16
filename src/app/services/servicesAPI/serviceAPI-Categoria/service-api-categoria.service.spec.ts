import { TestBed } from '@angular/core/testing';

import { ServiceAPICategoriaService } from './service-api-categoria.service';

describe('ServiceAPICategoriaService', () => {
  let service: ServiceAPICategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAPICategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
