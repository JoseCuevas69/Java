import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipounionComponent } from './lista-tipounion.component';

describe('ListaTipounionComponent', () => {
  let component: ListaTipounionComponent;
  let fixture: ComponentFixture<ListaTipounionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipounionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipounionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
