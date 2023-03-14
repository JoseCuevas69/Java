import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUnidadmedidaComponent } from './lista-unidadmedida.component';

describe('ListaUnidadmedidaComponent', () => {
  let component: ListaUnidadmedidaComponent;
  let fixture: ComponentFixture<ListaUnidadmedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUnidadmedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUnidadmedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
