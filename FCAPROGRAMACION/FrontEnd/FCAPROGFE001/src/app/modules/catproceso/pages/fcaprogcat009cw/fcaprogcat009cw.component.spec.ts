import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprogcat009cwComponent } from './fcaprogcat009cw.component';

describe('Fcaprogcat009cwComponent', () => {
  let component: Fcaprogcat009cwComponent;
  let fixture: ComponentFixture<Fcaprogcat009cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprogcat009cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprogcat009cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
