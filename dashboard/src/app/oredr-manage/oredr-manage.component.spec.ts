import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OredrManageComponent } from './oredr-manage.component';

describe('OredrManageComponent', () => {
  let component: OredrManageComponent;
  let fixture: ComponentFixture<OredrManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OredrManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OredrManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
