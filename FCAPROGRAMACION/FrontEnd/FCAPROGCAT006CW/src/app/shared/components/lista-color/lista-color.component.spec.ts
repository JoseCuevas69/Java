import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaColorComponent } from './lista-color.component';

describe('ListaColorComponent', () => {
  let component: ListaColorComponent;
  let fixture: ComponentFixture<ListaColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
