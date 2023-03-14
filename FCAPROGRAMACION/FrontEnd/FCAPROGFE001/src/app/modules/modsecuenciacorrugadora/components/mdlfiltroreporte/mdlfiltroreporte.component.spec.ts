import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlfiltroreporteComponent } from './mdlfiltroreporte.component';

describe('MdlfiltroreporteComponent', () => {
  let component: MdlfiltroreporteComponent;
  let fixture: ComponentFixture<MdlfiltroreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlfiltroreporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlfiltroreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
