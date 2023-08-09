import { TestBed } from '@angular/core/testing';

import { ServiceProdutosService } from './service-produtos.service';

describe('ServiceProdutosService', () => {
  let service: ServiceProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
