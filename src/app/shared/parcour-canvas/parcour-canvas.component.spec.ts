import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcourCanvasComponent } from './parcour-canvas.component';

describe('ParcourCanvasComponent', () => {
  let component: ParcourCanvasComponent;
  let fixture: ComponentFixture<ParcourCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcourCanvasComponent]
    });
    fixture = TestBed.createComponent(ParcourCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
