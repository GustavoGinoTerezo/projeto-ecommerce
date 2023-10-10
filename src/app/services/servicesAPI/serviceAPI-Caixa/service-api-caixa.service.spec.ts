import { TestBed } from '@angular/core/testing';

import { ServiceApiCaixaService } from './service-api-caixa.service';

describe('ServiceApiCaixaService', () => {
  let service: ServiceApiCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiCaixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
