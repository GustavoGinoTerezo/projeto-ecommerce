import { TestBed } from '@angular/core/testing';

import { ServiceApiRegistrarService } from './service-api-registrar.service';

describe('ServiceApiRegistrarService', () => {
  let service: ServiceApiRegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiRegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
