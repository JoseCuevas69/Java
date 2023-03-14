import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoindustriaComponent } from './tipoindustria.component';

describe('TipoindustriaComponent', () => {
  let component: TipoindustriaComponent;
  let fixture: ComponentFixture<TipoindustriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoindustriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoindustriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
