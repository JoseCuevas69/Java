import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcesocostoComponent } from './lista-procesocosto.component';

describe('ListaProcesocostoComponent', () => {
  let component: ListaProcesocostoComponent;
  let fixture: ComponentFixture<ListaProcesocostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProcesocostoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProcesocostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
