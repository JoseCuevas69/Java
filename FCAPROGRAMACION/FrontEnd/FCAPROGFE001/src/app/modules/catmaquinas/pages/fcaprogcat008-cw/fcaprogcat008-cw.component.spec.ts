import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCAPROGCAT008CWComponent } from './fcaprogcat008-cw.component';

describe('FCAPROGCAT008CWComponent', () => {
  let component: FCAPROGCAT008CWComponent;
  let fixture: ComponentFixture<FCAPROGCAT008CWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCAPROGCAT008CWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCAPROGCAT008CWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
