import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprogcat010cwComponent } from './fcaprogcat010cw.component';

describe('Fcaprogcat010cwComponent', () => {
  let component: Fcaprogcat010cwComponent;
  let fixture: ComponentFixture<Fcaprogcat010cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprogcat010cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprogcat010cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
