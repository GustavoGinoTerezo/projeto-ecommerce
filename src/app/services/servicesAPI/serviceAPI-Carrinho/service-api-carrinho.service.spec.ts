import { TestBed } from '@angular/core/testing';

import { ServiceApiCarrinhoService } from './service-api-carrinho.service';

describe('ServiceApiCarrinhoService', () => {
  let service: ServiceApiCarrinhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiCarrinhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
