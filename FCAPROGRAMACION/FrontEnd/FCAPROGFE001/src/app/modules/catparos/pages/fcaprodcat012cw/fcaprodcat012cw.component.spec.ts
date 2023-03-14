import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprodcat012cwComponent } from './fcaprodcat012cw.component';

describe('Fcaprodcat012cwComponent', () => {
  let component: Fcaprodcat012cwComponent;
  let fixture: ComponentFixture<Fcaprodcat012cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprodcat012cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprodcat012cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
