import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprogcat004cwComponent } from './fcaprogcat004cw.component';

describe('Fcaprogcat004cwComponent', () => {
  let component: Fcaprogcat004cwComponent;
  let fixture: ComponentFixture<Fcaprogcat004cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprogcat004cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprogcat004cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
