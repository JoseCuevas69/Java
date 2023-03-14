import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlconfieliminacionComponent } from './mdlconfieliminacion.component';

describe('MdlconfieliminacionComponent', () => {
  let component: MdlconfieliminacionComponent;
  let fixture: ComponentFixture<MdlconfieliminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlconfieliminacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlconfieliminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
