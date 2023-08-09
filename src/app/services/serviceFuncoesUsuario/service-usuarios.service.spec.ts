import { TestBed } from '@angular/core/testing';

import { ServiceUsuariosService } from './service-usuarios.service';

describe('ServiceUsuariosService', () => {
  let service: ServiceUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
