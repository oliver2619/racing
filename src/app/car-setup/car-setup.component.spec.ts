import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSetupComponent } from './car-setup.component';

describe('CarSetupComponent', () => {
  let component: CarSetupComponent;
  let fixture: ComponentFixture<CarSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarSetupComponent]
    });
    fixture = TestBed.createComponent(CarSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
