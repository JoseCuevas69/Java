import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprogcat006cwComponent } from './fcaprogcat006cw.component';

describe('Fcaprogcat006cwComponent', () => {
  let component: Fcaprogcat006cwComponent;
  let fixture: ComponentFixture<Fcaprogcat006cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprogcat006cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprogcat006cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
