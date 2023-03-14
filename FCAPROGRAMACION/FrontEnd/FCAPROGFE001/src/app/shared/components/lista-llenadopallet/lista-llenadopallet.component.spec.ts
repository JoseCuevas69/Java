import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLlenadopalletComponent } from './lista-llenadopallet.component';

describe('ListaLlenadopalletComponent', () => {
  let component: ListaLlenadopalletComponent;
  let fixture: ComponentFixture<ListaLlenadopalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLlenadopalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLlenadopalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
