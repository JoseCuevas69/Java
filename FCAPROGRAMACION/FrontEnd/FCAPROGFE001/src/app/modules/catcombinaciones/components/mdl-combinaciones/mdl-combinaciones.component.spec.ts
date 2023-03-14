import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCombinacionesComponent } from './mdl-combinaciones.component';

describe('MdlCombinacionesComponent', () => {
  let component: MdlCombinacionesComponent;
  let fixture: ComponentFixture<MdlCombinacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCombinacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCombinacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
