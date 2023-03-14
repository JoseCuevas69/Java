import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldFlautasComponent } from './mld-flautas.component';

describe('MldFlautasComponent', () => {
  let component: MldFlautasComponent;
  let fixture: ComponentFixture<MldFlautasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldFlautasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldFlautasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
