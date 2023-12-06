import { TestBed } from '@angular/core/testing';

import { ServiceAPIRedefinirSenhaService } from './service-api-redefinir-senha.service';

describe('ServiceAPIRedefinirSenhaService', () => {
  let service: ServiceAPIRedefinirSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAPIRedefinirSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
