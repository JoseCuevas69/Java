import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcomentariosComponent } from './tabcomentarios.component';

describe('TabcomentariosComponent', () => {
  let component: TabcomentariosComponent;
  let fixture: ComponentFixture<TabcomentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabcomentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcomentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
