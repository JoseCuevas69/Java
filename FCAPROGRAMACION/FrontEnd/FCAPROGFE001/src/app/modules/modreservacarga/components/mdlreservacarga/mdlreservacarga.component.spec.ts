import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlreservacargaComponent } from './mdlreservacarga.component';

describe('MdlreservacargaComponent', () => {
  let component: MdlreservacargaComponent;
  let fixture: ComponentFixture<MdlreservacargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlreservacargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlreservacargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
