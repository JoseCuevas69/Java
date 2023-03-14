import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlmacenstockComponent } from './lista-almacenstock.component';

describe('ListaAlmacenstockComponent', () => {
  let component: ListaAlmacenstockComponent;
  let fixture: ComponentFixture<ListaAlmacenstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlmacenstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlmacenstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
