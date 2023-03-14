import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cmo084mwComponent } from './cmo084mw.component';

describe('Cmo084mwComponent', () => {
  let component: Cmo084mwComponent;
  let fixture: ComponentFixture<Cmo084mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cmo084mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cmo084mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
