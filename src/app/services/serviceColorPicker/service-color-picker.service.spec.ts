import { TestBed } from '@angular/core/testing';

import { ServiceColorPickerService } from './service-color-picker.service';

describe('ServiceColorPickerService', () => {
  let service: ServiceColorPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceColorPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
