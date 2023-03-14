import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEstandaresvspropuestasComponent } from './tab-estandaresvspropuestas.component';

describe('TabEstandaresvspropuestasComponent', () => {
  let component: TabEstandaresvspropuestasComponent;
  let fixture: ComponentFixture<TabEstandaresvspropuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabEstandaresvspropuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEstandaresvspropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
