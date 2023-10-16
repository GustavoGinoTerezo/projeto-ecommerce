import { TestBed } from '@angular/core/testing';

import { ServiceComentariosService } from './service-comentarios.service';

describe('ServiceComentariosService', () => {
  let service: ServiceComentariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceComentariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
