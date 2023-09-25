import { TestBed } from '@angular/core/testing';

import { ServiceApiTelefonesService } from './service-api-telefones.service';

describe('ServiceApiTelefonesService', () => {
  let service: ServiceApiTelefonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiTelefonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
