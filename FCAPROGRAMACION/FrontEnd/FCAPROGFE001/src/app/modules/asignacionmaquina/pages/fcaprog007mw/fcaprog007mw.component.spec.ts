import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog007mwComponent } from './fcaprog007mw.component';

describe('Fcaprog007mwComponent', () => {
  let component: Fcaprog007mwComponent;
  let fixture: ComponentFixture<Fcaprog007mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog007mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog007mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
