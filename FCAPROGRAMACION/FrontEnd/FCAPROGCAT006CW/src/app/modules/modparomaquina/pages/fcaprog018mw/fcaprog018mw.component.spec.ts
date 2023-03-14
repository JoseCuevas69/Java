/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Fcaprog018mwComponent } from './fcaprog018mw.component';

describe('Fcaprog018mwComponent', () => {
  let component: Fcaprog018mwComponent;
  let fixture: ComponentFixture<Fcaprog018mwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fcaprog018mwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog018mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
