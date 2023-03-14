import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCFDIComponent } from './lista-cfdi.component';

describe('ListaCFDIComponent', () => {
  let component: ListaCFDIComponent;
  let fixture: ComponentFixture<ListaCFDIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCFDIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCFDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
