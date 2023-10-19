import { TestBed } from '@angular/core/testing';

import { ServiceNotaFiscalService } from './service-nota-fiscal.service';

describe('ServiceNotaFiscalService', () => {
  let service: ServiceNotaFiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNotaFiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
