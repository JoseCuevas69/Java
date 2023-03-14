import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFormaPagoComponent } from './lista-forma-pago.component';

describe('ListaFormaPagoComponent', () => {
  let component: ListaFormaPagoComponent;
  let fixture: ComponentFixture<ListaFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
