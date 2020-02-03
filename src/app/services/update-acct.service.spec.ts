import { TestBed } from '@angular/core/testing';

import { UpdateAcctService } from './update-acct.service';

describe('UpdateAcctService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateAcctService = TestBed.get(UpdateAcctService);
    expect(service).toBeTruthy();
  });
});
