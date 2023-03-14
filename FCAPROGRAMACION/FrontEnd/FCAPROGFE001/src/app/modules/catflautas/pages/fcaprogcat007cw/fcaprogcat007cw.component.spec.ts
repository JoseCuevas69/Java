import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprogcat007cwComponent } from './fcaprogcat007cw.component';

describe('Fcaprogcat007cwComponent', () => {
  let component: Fcaprogcat007cwComponent;
  let fixture: ComponentFixture<Fcaprogcat007cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprogcat007cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprogcat007cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
