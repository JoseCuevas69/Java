import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog006mwComponent } from './fcaprog006mw.component';

describe('Fcaprog006mwComponent', () => {
  let component: Fcaprog006mwComponent;
  let fixture: ComponentFixture<Fcaprog006mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog006mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog006mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
