import { TestBed } from '@angular/core/testing';

import { ServiceApiNotaFiscalService } from './service-api-nota-fiscal.service';

describe('ServiceApiNotaFiscalService', () => {
  let service: ServiceApiNotaFiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiNotaFiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
