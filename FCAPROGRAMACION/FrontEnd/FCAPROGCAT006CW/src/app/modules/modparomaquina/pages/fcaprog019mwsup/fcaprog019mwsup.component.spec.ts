/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Fcaprog019mwsupComponent } from './fcaprog019mwsup.component';

describe('Fcaprog019mwsupComponent', () => {
  let component: Fcaprog019mwsupComponent;
  let fixture: ComponentFixture<Fcaprog019mwsupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fcaprog019mwsupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog019mwsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
