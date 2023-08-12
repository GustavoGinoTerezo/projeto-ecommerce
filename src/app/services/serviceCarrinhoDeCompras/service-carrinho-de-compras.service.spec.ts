import { TestBed } from '@angular/core/testing';

import { ServiceCarrinhoDeComprasService } from './service-carrinho-de-compras.service';

describe('ServiceCarrinhoDeComprasService', () => {
  let service: ServiceCarrinhoDeComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCarrinhoDeComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
