import { TestBed } from '@angular/core/testing';

import { HorariomaquinaserviceService } from './horariomaquinaservice.service';

describe('HorariomaquinaserviceService', () => {
  let service: HorariomaquinaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariomaquinaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
