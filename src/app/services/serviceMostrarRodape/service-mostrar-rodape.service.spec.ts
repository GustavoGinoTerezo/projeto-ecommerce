import { TestBed } from '@angular/core/testing';

import { ServiceMostrarRodapeService } from './service-mostrar-rodape.service';

describe('ServiceMostrarRodapeService', () => {
  let service: ServiceMostrarRodapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMostrarRodapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
