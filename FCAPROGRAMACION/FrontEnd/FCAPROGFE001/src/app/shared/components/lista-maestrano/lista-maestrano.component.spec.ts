import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMaestranoComponent } from './lista-maestrano.component';

describe('ListaMaestranoComponent', () => {
  let component: ListaMaestranoComponent;
  let fixture: ComponentFixture<ListaMaestranoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMaestranoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMaestranoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
