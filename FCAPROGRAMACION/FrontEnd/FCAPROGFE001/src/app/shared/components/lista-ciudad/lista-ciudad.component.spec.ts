import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCiudadComponent } from './lista-ciudad.component';

describe('ListaCiudadComponent', () => {
  let component: ListaCiudadComponent;
  let fixture: ComponentFixture<ListaCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCiudadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
