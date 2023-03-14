import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog003mwComponent } from './fcaprog003mw.component';

describe('Fcaprog003mwComponent', () => {
  let component: Fcaprog003mwComponent;
  let fixture: ComponentFixture<Fcaprog003mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog003mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog003mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
