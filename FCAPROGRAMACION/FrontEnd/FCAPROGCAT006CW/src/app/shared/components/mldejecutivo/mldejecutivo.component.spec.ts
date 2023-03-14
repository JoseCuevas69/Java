import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldejecutivoComponent } from './mldejecutivo.component';

describe('MldejecutivoComponent', () => {
  let component: MldejecutivoComponent;
  let fixture: ComponentFixture<MldejecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldejecutivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldejecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
