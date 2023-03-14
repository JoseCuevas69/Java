import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldModvariacionesComponent } from './mld-modvariaciones.component';

describe('MldModvariacionesComponent', () => {
  let component: MldModvariacionesComponent;
  let fixture: ComponentFixture<MldModvariacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldModvariacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldModvariacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
