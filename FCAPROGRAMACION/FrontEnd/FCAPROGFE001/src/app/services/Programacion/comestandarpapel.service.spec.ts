import { TestBed } from '@angular/core/testing';

import { ComestandarpapelService } from './comestandarpapel.service';

describe('ComestandarpapelService', () => {
  let service: ComestandarpapelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComestandarpapelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
