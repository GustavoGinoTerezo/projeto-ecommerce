import { TestBed } from '@angular/core/testing';

import { ServiceApiLoginService } from './service-api-login.service';

describe('ServiceApiLoginService', () => {
  let service: ServiceApiLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
