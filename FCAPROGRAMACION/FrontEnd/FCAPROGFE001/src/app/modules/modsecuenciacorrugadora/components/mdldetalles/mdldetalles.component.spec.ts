import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdldetallesComponent } from './mdldetalles.component';

describe('MdldetallesComponent', () => {
  let component: MdldetallesComponent;
  let fixture: ComponentFixture<MdldetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdldetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdldetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
