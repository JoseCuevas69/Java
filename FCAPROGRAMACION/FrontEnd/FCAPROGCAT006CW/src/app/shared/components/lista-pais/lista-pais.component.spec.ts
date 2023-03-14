import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaisComponent } from './lista-pais.component';

describe('ListaPaisComponent', () => {
  let component: ListaPaisComponent;
  let fixture: ComponentFixture<ListaPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
