import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlimprimirComponent } from './mdlimprimir.component';

describe('MdlimprimirComponent', () => {
  let component: MdlimprimirComponent;
  let fixture: ComponentFixture<MdlimprimirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlimprimirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlimprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
