import { TestBed } from '@angular/core/testing';

import { ServiceUrlGlobalService } from './service-url-global.service';

describe('ServiceUrlGlobalService', () => {
  let service: ServiceUrlGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUrlGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
