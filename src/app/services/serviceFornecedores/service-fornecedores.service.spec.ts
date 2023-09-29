import { TestBed } from '@angular/core/testing';

import { ServiceFornecedoresService } from './service-fornecedores.service';

describe('ServiceFornecedoresService', () => {
  let service: ServiceFornecedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFornecedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
