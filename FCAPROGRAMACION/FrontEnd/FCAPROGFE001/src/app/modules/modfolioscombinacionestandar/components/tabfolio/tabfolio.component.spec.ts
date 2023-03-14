import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabfolioComponent } from './tabfolio.component';

describe('TabfolioComponent', () => {
  let component: TabfolioComponent;
  let fixture: ComponentFixture<TabfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
