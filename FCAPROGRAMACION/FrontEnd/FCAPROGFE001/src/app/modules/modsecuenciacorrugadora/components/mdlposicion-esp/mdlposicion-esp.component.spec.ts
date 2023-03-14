import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlposicionEspComponent } from './mdlposicion-esp.component';

describe('MdlposicionEspComponent', () => {
  let component: MdlposicionEspComponent;
  let fixture: ComponentFixture<MdlposicionEspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlposicionEspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlposicionEspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
