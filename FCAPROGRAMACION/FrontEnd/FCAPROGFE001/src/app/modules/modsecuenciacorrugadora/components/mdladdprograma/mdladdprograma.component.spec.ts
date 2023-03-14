import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdladdprogramaComponent } from './mdladdprograma.component';

describe('MdladdprogramaComponent', () => {
  let component: MdladdprogramaComponent;
  let fixture: ComponentFixture<MdladdprogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdladdprogramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdladdprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
