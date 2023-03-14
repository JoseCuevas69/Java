import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCodVariacionComponent } from './lista-codvariacion.component';

describe('ListaCodVariacionComponent', () => {
  let component: ListaCodVariacionComponent;
  let fixture: ComponentFixture<ListaCodVariacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCodVariacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCodVariacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
