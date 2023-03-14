import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldusuarioComponent } from './mldusuario.component';

describe('MldusuarioComponent', () => {
  let component: MldusuarioComponent;
  let fixture: ComponentFixture<MldusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
