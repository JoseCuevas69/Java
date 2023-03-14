import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipovariacionComponent } from './lista-tipovariacion.component';

describe('ListaTipovariacionComponent', () => {
  let component: ListaTipovariacionComponent;
  let fixture: ComponentFixture<ListaTipovariacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipovariacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipovariacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
