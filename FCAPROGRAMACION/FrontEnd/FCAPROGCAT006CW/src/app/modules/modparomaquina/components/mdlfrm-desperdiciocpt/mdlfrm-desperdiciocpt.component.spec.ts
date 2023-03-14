/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MdlfrmDesperdiciocptComponent } from './mdlfrm-desperdiciocpt.component';

describe('MdlfrmDesperdiciocptComponent', () => {
  let component: MdlfrmDesperdiciocptComponent;
  let fixture: ComponentFixture<MdlfrmDesperdiciocptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdlfrmDesperdiciocptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlfrmDesperdiciocptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
