import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog010mwComponent } from './fcaprog010mw.component';

describe('Fcaprog010mwComponent', () => {
  let component: Fcaprog010mwComponent;
  let fixture: ComponentFixture<Fcaprog010mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog010mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog010mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
