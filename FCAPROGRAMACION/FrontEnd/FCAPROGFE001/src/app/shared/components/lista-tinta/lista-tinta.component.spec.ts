import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTintaComponent } from './lista-tinta.component';

describe('ListaTintaComponent', () => {
  let component: ListaTintaComponent;
  let fixture: ComponentFixture<ListaTintaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTintaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTintaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
