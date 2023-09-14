import { TestBed } from '@angular/core/testing';

import { ServiceRegistrarService } from './service-registrar.service';

describe('ServiceRegistrarService', () => {
  let service: ServiceRegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
