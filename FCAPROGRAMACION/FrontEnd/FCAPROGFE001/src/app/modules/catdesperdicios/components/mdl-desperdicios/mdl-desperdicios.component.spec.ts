import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlDesperdiciosComponent } from './mdl-desperdicios.component';

describe('MdlDesperdiciosComponent', () => {
  let component: MdlDesperdiciosComponent;
  let fixture: ComponentFixture<MdlDesperdiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlDesperdiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlDesperdiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
