import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlobservacionesprogimpresoraComponent } from './mdlobservacionesprogimpresora.component';

describe('MdlobservacionesprogimpresoraComponent', () => {
  let component: MdlobservacionesprogimpresoraComponent;
  let fixture: ComponentFixture<MdlobservacionesprogimpresoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlobservacionesprogimpresoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlobservacionesprogimpresoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
