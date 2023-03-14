import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClasificacionComponent } from './lista-clasificacion.component';

describe('ListaClasificacionComponent', () => {
  let component: ListaClasificacionComponent;
  let fixture: ComponentFixture<ListaClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaClasificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
