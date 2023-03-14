import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cmo085mwComponent } from './cmo085mw.component';

describe('Cmo085mwComponent', () => {
  let component: Cmo085mwComponent;
  let fixture: ComponentFixture<Cmo085mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cmo085mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cmo085mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
