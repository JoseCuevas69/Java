/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MdlbuscararticuloComponent } from './mdlbuscararticulo.component';

describe('MdlbuscararticuloComponent', () => {
  let component: MdlbuscararticuloComponent;
  let fixture: ComponentFixture<MdlbuscararticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdlbuscararticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlbuscararticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
