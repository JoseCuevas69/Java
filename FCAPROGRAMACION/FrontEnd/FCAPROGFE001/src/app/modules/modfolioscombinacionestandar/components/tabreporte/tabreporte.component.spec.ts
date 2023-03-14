import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabreporteComponent } from './tabreporte.component';

describe('TabreporteComponent', () => {
  let component: TabreporteComponent;
  let fixture: ComponentFixture<TabreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabreporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
