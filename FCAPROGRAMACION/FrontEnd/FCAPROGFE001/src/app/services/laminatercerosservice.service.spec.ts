import { TestBed } from '@angular/core/testing';

import { LaminatercerosserviceService } from './laminatercerosservice.service';

describe('LaminatercerosserviceService', () => {
  let service: LaminatercerosserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaminatercerosserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
