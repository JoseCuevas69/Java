import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprog004mwComponent } from './fcaprog004mw.component';

describe('Fcaprog004mwComponent', () => {
  let component: Fcaprog004mwComponent;
  let fixture: ComponentFixture<Fcaprog004mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprog004mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog004mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
