import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlfoliocombinacionComponent } from './mdlfoliocombinacion.component';

describe('MdlfoliocombinacionComponent', () => {
  let component: MdlfoliocombinacionComponent;
  let fixture: ComponentFixture<MdlfoliocombinacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlfoliocombinacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlfoliocombinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
