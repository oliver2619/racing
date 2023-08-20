import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipRankingComponent } from './championship-ranking.component';

describe('ChampionshipRankingComponent', () => {
  let component: ChampionshipRankingComponent;
  let fixture: ComponentFixture<ChampionshipRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipRankingComponent]
    });
    fixture = TestBed.createComponent(ChampionshipRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
