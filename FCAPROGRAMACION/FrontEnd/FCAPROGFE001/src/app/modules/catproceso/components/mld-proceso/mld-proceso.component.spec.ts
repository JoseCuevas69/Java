import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldProcesoComponent } from './mld-proceso.component';

describe('MldProcesoComponent', () => {
  let component: MldProcesoComponent;
  let fixture: ComponentFixture<MldProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
