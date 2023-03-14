import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog002mwComponent } from './fcaprog002mw.component';

describe('Fcaprog002mwComponent', () => {
  let component: Fcaprog002mwComponent;
  let fixture: ComponentFixture<Fcaprog002mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog002mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog002mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
