import { TestBed } from '@angular/core/testing';

import { FolioscombinacionestandarserviceService } from './folioscombinacionestandarservice.service';

describe('FolioscombinacionestandarserviceService', () => {
  let service: FolioscombinacionestandarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolioscombinacionestandarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
