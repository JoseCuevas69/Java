import { TestBed } from '@angular/core/testing';

import { RutaprocesosserviceService } from './rutaprocesosservice.service';

describe('RutaprocesosserviceService', () => {
  let service: RutaprocesosserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaprocesosserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
