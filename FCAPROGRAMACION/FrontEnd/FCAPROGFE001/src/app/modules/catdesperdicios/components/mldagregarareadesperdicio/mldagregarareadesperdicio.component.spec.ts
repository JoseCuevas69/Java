import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MldagregarareadesperdicioComponent } from './mldagregarareadesperdicio.component';

describe('MldagregarareadesperdicioComponent', () => {
  let component: MldagregarareadesperdicioComponent;
  let fixture: ComponentFixture<MldagregarareadesperdicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MldagregarareadesperdicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MldagregarareadesperdicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
