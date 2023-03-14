import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog099mwComponent } from './fcaprog099mw.component';

describe('Fcaprog099mwComponent', () => {
  let component: Fcaprog099mwComponent;
  let fixture: ComponentFixture<Fcaprog099mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog099mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog099mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
