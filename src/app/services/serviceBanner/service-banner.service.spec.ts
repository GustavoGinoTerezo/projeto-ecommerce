import { TestBed } from '@angular/core/testing';

import { ServiceBannerService } from './service-banner.service';

describe('ServiceBannerService', () => {
  let service: ServiceBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
