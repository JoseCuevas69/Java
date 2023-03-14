import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesperdicioComponent } from './lista-desperdicio.component';

describe('ListaDesperdicioComponent', () => {
  let component: ListaDesperdicioComponent;
  let fixture: ComponentFixture<ListaDesperdicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDesperdicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDesperdicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
