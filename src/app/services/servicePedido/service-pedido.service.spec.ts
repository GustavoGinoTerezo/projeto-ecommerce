import { TestBed } from '@angular/core/testing';

import { ServicePedidoService } from './service-pedido.service';

describe('ServicePedidoService', () => {
  let service: ServicePedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
