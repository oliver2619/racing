import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipComponent } from './championship.component';

describe('ChampionshipComponent', () => {
  let component: ChampionshipComponent;
  let fixture: ComponentFixture<ChampionshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipComponent]
    });
    fixture = TestBed.createComponent(ChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
