import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClavepreparacionComponent } from './lista-clavepreparacion.component';

describe('ListaClavepreparacionComponent', () => {
  let component: ListaClavepreparacionComponent;
  let fixture: ComponentFixture<ListaClavepreparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaClavepreparacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClavepreparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
