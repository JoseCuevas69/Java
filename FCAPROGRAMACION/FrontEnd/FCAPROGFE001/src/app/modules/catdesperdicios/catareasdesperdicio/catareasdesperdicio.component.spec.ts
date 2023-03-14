import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatareasdesperdicioComponent } from './catareasdesperdicio.component';

describe('CatareasdesperdicioComponent', () => {
  let component: CatareasdesperdicioComponent;
  let fixture: ComponentFixture<CatareasdesperdicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatareasdesperdicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatareasdesperdicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
