import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlbuscaropComponent } from './mdlbuscarop.component';

describe('MdlbuscaropComponent', () => {
  let component: MdlbuscaropComponent;
  let fixture: ComponentFixture<MdlbuscaropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlbuscaropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlbuscaropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
