import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiporemisionadoComponent } from './lista-tiporemisionado.component';

describe('ListaTiporemisionadoComponent', () => {
  let component: ListaTiporemisionadoComponent;
  let fixture: ComponentFixture<ListaTiporemisionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTiporemisionadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTiporemisionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
