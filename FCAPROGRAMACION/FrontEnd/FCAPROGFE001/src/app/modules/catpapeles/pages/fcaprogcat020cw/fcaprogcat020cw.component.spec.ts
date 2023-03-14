import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprogcat020cwComponent } from './fcaprogcat020cw.component';

describe('Fcaprogcat020cwComponent', () => {
  let component: Fcaprogcat020cwComponent;
  let fixture: ComponentFixture<Fcaprogcat020cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprogcat020cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprogcat020cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
