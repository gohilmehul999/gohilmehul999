import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartnowComponent } from './cartnow.component';

describe('CartnowComponent', () => {
  let component: CartnowComponent;
  let fixture: ComponentFixture<CartnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartnowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
