import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFlautaComponent } from './lista-flauta.component';

describe('ListaFlautaComponent', () => {
  let component: ListaFlautaComponent;
  let fixture: ComponentFixture<ListaFlautaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFlautaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFlautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
