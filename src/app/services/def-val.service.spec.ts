import { TestBed } from '@angular/core/testing';

import { DefValService } from './def-val.service';

describe('DefValService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefValService = TestBed.get(DefValService);
    expect(service).toBeTruthy();
  });
});
