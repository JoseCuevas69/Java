import { TestBed } from '@angular/core/testing';

import { ParomaquinaserviceService } from './paromaquinaservice.service';

describe('ParomaquinaserviceService', () => {
  let service: ParomaquinaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParomaquinaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
