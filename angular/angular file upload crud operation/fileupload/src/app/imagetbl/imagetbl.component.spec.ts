import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagetblComponent } from './imagetbl.component';

describe('ImagetblComponent', () => {
  let component: ImagetblComponent;
  let fixture: ComponentFixture<ImagetblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagetblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagetblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
