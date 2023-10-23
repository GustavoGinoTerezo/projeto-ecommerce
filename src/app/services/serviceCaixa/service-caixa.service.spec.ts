import { TestBed } from '@angular/core/testing';

import { ServiceCaixaService } from './service-caixa.service';

describe('ServiceCaixaService', () => {
  let service: ServiceCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCaixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
