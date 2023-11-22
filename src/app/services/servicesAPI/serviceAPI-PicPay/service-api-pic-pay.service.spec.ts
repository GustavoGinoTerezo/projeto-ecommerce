import { TestBed } from '@angular/core/testing';

import { ServiceAPIPicPayService } from './service-api-pic-pay.service';

describe('ServiceAPIPicPayService', () => {
  let service: ServiceAPIPicPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAPIPicPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
