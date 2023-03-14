import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCargoareacapComponent } from './lista-cargoareacap.component';

describe('ListaCargoareacapComponent', () => {
  let component: ListaCargoareacapComponent;
  let fixture: ComponentFixture<ListaCargoareacapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCargoareacapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCargoareacapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
