import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCAPROG008MWComponent } from './fcaprog008-mw.component';

describe('FCAPROG008MWComponent', () => {
  let component: FCAPROG008MWComponent;
  let fixture: ComponentFixture<FCAPROG008MWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCAPROG008MWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCAPROG008MWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
