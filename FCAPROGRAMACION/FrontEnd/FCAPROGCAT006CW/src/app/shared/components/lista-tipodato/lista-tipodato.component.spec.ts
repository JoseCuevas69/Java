import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipodatoComponent } from './lista-tipodato.component';

describe('ListaTipodatoComponent', () => {
  let component: ListaTipodatoComponent;
  let fixture: ComponentFixture<ListaTipodatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipodatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipodatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
