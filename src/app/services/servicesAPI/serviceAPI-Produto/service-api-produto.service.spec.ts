import { TestBed } from '@angular/core/testing';

import { ServiceAPIProdutoService } from './service-api-produto.service';

describe('ServiceAPIProdutoService', () => {
  let service: ServiceAPIProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAPIProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
