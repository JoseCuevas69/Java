import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPresentacionComponent } from './lista-presentacion.component';

describe('ListaPresentacionComponent', () => {
  let component: ListaPresentacionComponent;
  let fixture: ComponentFixture<ListaPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPresentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
