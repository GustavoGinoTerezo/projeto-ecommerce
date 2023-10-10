import { TestBed } from '@angular/core/testing';

import { ServiceApiComentariosService } from './service-api-comentarios.service';

describe('ServiceApiComentariosService', () => {
  let service: ServiceApiComentariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiComentariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
