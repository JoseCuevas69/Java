import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlmacenComponent } from './lista-almacen.component';

describe('ListaAlmacenComponent', () => {
  let component: ListaAlmacenComponent;
  let fixture: ComponentFixture<ListaAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
