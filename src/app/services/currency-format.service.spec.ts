import { TestBed } from '@angular/core/testing';

import { CurrencyFormatService } from './currency-format.service';

describe('CurrencyFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyFormatService = TestBed.get(CurrencyFormatService);
    expect(service).toBeTruthy();
  });
});
