import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipocajaComponent } from './lista-tipocaja.component';

describe('ListaTipocajaComponent', () => {
  let component: ListaTipocajaComponent;
  let fixture: ComponentFixture<ListaTipocajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipocajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipocajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
