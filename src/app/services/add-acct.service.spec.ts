import { TestBed } from '@angular/core/testing';

import { AddAcctService } from './add-acct.service';

describe('AddAcctService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAcctService = TestBed.get(AddAcctService);
    expect(service).toBeTruthy();
  });
});
