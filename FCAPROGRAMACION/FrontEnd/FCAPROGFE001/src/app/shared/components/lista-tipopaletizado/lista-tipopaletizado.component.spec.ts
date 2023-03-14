import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipopaletizadoComponent } from './lista-tipopaletizado.component';

describe('ListaTipopaletizadoComponent', () => {
  let component: ListaTipopaletizadoComponent;
  let fixture: ComponentFixture<ListaTipopaletizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipopaletizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipopaletizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
