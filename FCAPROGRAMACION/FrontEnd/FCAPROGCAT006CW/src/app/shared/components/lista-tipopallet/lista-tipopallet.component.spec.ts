import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipopalletComponent } from './lista-tipopallet.component';

describe('ListaTipopalletComponent', () => {
  let component: ListaTipopalletComponent;
  let fixture: ComponentFixture<ListaTipopalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipopalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipopalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
