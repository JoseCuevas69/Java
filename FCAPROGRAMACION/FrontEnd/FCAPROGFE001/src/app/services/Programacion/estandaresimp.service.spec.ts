import { TestBed } from '@angular/core/testing';

import { EstandaresimpService } from './estandaresimp.service';

describe('EstandaresimpService', () => {
  let service: EstandaresimpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstandaresimpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
