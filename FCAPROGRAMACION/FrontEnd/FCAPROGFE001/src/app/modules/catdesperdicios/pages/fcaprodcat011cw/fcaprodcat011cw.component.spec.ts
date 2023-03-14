import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fcaprodcat011cwComponent } from './fcaprodcat011cw.component';

describe('Fcaprodcat011cwComponent', () => {
  let component: Fcaprodcat011cwComponent;
  let fixture: ComponentFixture<Fcaprodcat011cwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fcaprodcat011cwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprodcat011cwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
