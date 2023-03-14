import { TestBed } from '@angular/core/testing';

import { AsignacionmaquinaService } from './asignacionmaquina.service';

describe('AsignacionmaquinaService', () => {
  let service: AsignacionmaquinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionmaquinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
