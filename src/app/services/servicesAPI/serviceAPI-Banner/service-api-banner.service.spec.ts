import { TestBed } from '@angular/core/testing';

import { ServiceApiBannerService } from './service-api-banner.service';

describe('ServiceApiBannerService', () => {
  let service: ServiceApiBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
