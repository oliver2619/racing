import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSetupHelpComponent } from './car-setup-help.component';

describe('CarSetupHelpComponent', () => {
  let component: CarSetupHelpComponent;
  let fixture: ComponentFixture<CarSetupHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarSetupHelpComponent]
    });
    fixture = TestBed.createComponent(CarSetupHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
