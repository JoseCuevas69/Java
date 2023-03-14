import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVariacionComponent } from './lista-variacion.component';

describe('ListaVariacionComponent', () => {
  let component: ListaVariacionComponent;
  let fixture: ComponentFixture<ListaVariacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVariacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVariacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
