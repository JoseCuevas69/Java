import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMetodoPagoComponent } from './lista-metodo-pago.component';

describe('ListaMetodoPagoComponent', () => {
  let component: ListaMetodoPagoComponent;
  let fixture: ComponentFixture<ListaMetodoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMetodoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
