import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoproductoComponent } from './lista-tipoproducto.component';

describe('ListaTipoproductoComponent', () => {
  let component: ListaTipoproductoComponent;
  let fixture: ComponentFixture<ListaTipoproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipoproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipoproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
