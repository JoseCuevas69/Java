import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlParomaquinaComponent } from './mdl-paromaquina.component';

describe('MdlParomaquinaComponent', () => {
  let component: MdlParomaquinaComponent;
  let fixture: ComponentFixture<MdlParomaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlParomaquinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlParomaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
