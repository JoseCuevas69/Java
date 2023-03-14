import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaResistenciasComponent } from './lista-resistencias.component';

describe('ListaResistenciasComponent', () => {
  let component: ListaResistenciasComponent;
  let fixture: ComponentFixture<ListaResistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaResistenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaResistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
