import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDiasinventarioComponent } from './lista-diasinventario.component';

describe('ListaDiasinventarioComponent', () => {
  let component: ListaDiasinventarioComponent;
  let fixture: ComponentFixture<ListaDiasinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDiasinventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDiasinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
