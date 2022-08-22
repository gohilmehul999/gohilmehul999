import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterializeComponent } from './materialize.component';

describe('MaterializeComponent', () => {
  let component: MaterializeComponent;
  let fixture: ComponentFixture<MaterializeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterializeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
