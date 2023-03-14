import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog001mwComponent } from './fcaprog001mw.component';

describe('Fcaprog001mwComponent', () => {
  let component: Fcaprog001mwComponent;
  let fixture: ComponentFixture<Fcaprog001mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog001mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog001mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
