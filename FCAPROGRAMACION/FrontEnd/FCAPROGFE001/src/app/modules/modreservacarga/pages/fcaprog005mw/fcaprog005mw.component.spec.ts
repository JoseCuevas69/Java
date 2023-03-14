import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog005mwComponent } from './fcaprog005mw.component';

describe('Fcaprog005mwComponent', () => {
  let component: Fcaprog005mwComponent;
  let fixture: ComponentFixture<Fcaprog005mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog005mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog005mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
