import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTipocajaComponent } from './mdl-tipocaja.component';

describe('MdlTipocajaComponent', () => {
  let component: MdlTipocajaComponent;
  let fixture: ComponentFixture<MdlTipocajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlTipocajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlTipocajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
