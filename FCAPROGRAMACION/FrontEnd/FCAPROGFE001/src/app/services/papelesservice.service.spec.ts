import { TestBed } from '@angular/core/testing';

import { PapelesserviceService } from './papelesservice.service';

describe('PapelesserviceService', () => {
  let service: PapelesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PapelesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
