import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubcodigoComponent } from './lista-subcodigo.component';

describe('ListaSubcodigoComponent', () => {
  let component: ListaSubcodigoComponent;
  let fixture: ComponentFixture<ListaSubcodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSubcodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSubcodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
