import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipPreviousRaceComponent } from './championship-previous-race.component';

describe('ChampionshipPreviousRaceComponent', () => {
  let component: ChampionshipPreviousRaceComponent;
  let fixture: ComponentFixture<ChampionshipPreviousRaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipPreviousRaceComponent]
    });
    fixture = TestBed.createComponent(ChampionshipPreviousRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
