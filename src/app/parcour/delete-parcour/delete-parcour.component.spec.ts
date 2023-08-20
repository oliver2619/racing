import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParcourComponent } from './delete-parcour.component';

describe('DeleteParcourComponent', () => {
  let component: DeleteParcourComponent;
  let fixture: ComponentFixture<DeleteParcourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteParcourComponent]
    });
    fixture = TestBed.createComponent(DeleteParcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
