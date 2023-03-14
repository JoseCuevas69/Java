/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Fcaprog019mwimpComponent } from './fcaprog019mwimp.component';

describe('Fcaprog019mwimpComponent', () => {
  let component: Fcaprog019mwimpComponent;
  let fixture: ComponentFixture<Fcaprog019mwimpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fcaprog019mwimpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fcaprog019mwimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
