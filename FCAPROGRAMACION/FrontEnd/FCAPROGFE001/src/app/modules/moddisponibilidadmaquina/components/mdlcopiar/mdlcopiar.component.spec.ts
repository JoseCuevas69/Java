import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlcopiarComponent } from './mdlcopiar.component';

describe('MdlcopiarComponent', () => {
  let component: MdlcopiarComponent;
  let fixture: ComponentFixture<MdlcopiarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlcopiarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlcopiarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
