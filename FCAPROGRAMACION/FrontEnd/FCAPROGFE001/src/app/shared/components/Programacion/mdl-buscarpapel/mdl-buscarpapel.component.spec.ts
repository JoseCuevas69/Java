import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlBuscarpapelComponent } from './mdl-buscarpapel.component';

describe('MdlBuscarpapelComponent', () => {
  let component: MdlBuscarpapelComponent;
  let fixture: ComponentFixture<MdlBuscarpapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlBuscarpapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlBuscarpapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
