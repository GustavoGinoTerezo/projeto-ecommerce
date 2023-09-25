import { TestBed } from '@angular/core/testing';

import { ServiceApiEmailsService } from './service-api-emails.service';

describe('ServiceApiEmailsService', () => {
  let service: ServiceApiEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
