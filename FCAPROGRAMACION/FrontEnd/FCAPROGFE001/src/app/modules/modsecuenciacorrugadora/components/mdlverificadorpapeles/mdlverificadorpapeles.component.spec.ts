import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlverificadorpapelesComponent } from './mdlverificadorpapeles.component';

describe('MdlverificadorpapelesComponent', () => {
  let component: MdlverificadorpapelesComponent;
  let fixture: ComponentFixture<MdlverificadorpapelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlverificadorpapelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlverificadorpapelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
