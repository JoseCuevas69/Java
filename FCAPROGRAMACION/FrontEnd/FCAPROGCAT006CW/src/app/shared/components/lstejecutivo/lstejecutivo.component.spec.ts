import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstejecutivoComponent } from './lstejecutivo.component';

describe('LstejecutivoComponent', () => {
  let component: LstejecutivoComponent;
  let fixture: ComponentFixture<LstejecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstejecutivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstejecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
