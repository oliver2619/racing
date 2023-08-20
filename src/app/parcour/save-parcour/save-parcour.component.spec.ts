import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveParcourComponent } from './save-parcour.component';

describe('SaveParcourComponent', () => {
  let component: SaveParcourComponent;
  let fixture: ComponentFixture<SaveParcourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveParcourComponent]
    });
    fixture = TestBed.createComponent(SaveParcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
