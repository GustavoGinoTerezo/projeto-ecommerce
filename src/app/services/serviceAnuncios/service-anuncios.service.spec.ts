import { TestBed } from '@angular/core/testing';

import { ServiceAnunciosService } from './service-anuncios.service';

describe('ServiceAnunciosService', () => {
  let service: ServiceAnunciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAnunciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
