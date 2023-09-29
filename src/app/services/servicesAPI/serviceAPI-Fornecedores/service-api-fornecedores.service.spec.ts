import { TestBed } from '@angular/core/testing';

import { ServiceApiFornecedoresService } from './service-api-fornecedores.service';

describe('ServiceApiFornecedoresService', () => {
  let service: ServiceApiFornecedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiFornecedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
