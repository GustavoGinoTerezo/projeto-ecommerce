import { TestBed } from '@angular/core/testing';

import { ServiceApiCoresService } from './service-api-cores.service';

describe('ServiceApiCoresService', () => {
  let service: ServiceApiCoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiCoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
