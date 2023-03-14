import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCAPROD002MWComponent } from './fcaprod002-mw.component';

describe('FCAPROD002MWComponent', () => {
  let component: FCAPROD002MWComponent;
  let fixture: ComponentFixture<FCAPROD002MWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCAPROD002MWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCAPROD002MWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
