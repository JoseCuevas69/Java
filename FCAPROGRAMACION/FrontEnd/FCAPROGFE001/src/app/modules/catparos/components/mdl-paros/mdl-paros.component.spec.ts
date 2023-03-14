import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlParosComponent } from './mdl-paros.component';

describe('MdlParosComponent', () => {
  let component: MdlParosComponent;
  let fixture: ComponentFixture<MdlParosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlParosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlParosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
