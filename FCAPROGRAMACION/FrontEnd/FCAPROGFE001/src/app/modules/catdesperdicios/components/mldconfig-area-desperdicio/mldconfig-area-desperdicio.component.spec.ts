import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldconfigAreaDesperdicioComponent } from './mldconfig-area-desperdicio.component';

describe('MldconfigAreaDesperdicioComponent', () => {
  let component: MldconfigAreaDesperdicioComponent;
  let fixture: ComponentFixture<MldconfigAreaDesperdicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldconfigAreaDesperdicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldconfigAreaDesperdicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
