import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaprincipalComponent } from './pantallaprincipal.component';

describe('PantallaprincipalComponent', () => {
  let component: PantallaprincipalComponent;
  let fixture: ComponentFixture<PantallaprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
