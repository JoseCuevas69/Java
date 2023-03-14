import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIVAComponent } from './lista-iva.component';

describe('ListaIVAComponent', () => {
  let component: ListaIVAComponent;
  let fixture: ComponentFixture<ListaIVAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaIVAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
