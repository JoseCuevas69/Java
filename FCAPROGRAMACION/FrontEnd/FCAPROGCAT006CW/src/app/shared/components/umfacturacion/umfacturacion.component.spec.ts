import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmfacturacionComponent } from './umfacturacion.component';

describe('UmfacturacionComponent', () => {
  let component: UmfacturacionComponent;
  let fixture: ComponentFixture<UmfacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmfacturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmfacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
