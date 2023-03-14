import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog009mwComponent } from './fcaprog009mw.component';

describe('Fcaprog009mwComponent', () => {
  let component: Fcaprog009mwComponent;
  let fixture: ComponentFixture<Fcaprog009mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog009mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog009mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
