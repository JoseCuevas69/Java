/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Fcaprog019mwComponent } from './fcaprog019mw.component';

describe('Fcaprog019mwComponent', () => {
  let component: Fcaprog019mwComponent;
  let fixture: ComponentFixture<Fcaprog019mwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fcaprog019mwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog019mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
