import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlmodpreparacionComponent } from './mdlmodpreparacion.component';

describe('MdlmodpreparacionComponent', () => {
  let component: MdlmodpreparacionComponent;
  let fixture: ComponentFixture<MdlmodpreparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlmodpreparacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlmodpreparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
