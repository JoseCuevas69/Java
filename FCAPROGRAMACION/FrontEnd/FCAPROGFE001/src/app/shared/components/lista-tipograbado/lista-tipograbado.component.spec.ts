import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipograbadoComponent } from './lista-tipograbado.component';

describe('ListaTipograbadoComponent', () => {
  let component: ListaTipograbadoComponent;
  let fixture: ComponentFixture<ListaTipograbadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipograbadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipograbadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
