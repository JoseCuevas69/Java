import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipomaquinaComponent } from './lista-tipomaquina.component';

describe('ListaTipomaquinaComponent', () => {
  let component: ListaTipomaquinaComponent;
  let fixture: ComponentFixture<ListaTipomaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipomaquinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipomaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
