import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlpapelesComponent } from './mdlpapeles.component';

describe('MdlpapelesComponent', () => {
  let component: MdlpapelesComponent;
  let fixture: ComponentFixture<MdlpapelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlpapelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlpapelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
