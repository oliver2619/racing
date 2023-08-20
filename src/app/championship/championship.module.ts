import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionshipComponent } from './championship/championship.component';
import { ChampionshipPreviousRaceComponent } from './championship-previous-race/championship-previous-race.component';
import { ChampionshipRankingComponent } from './championship-ranking/championship-ranking.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    ChampionshipComponent,
    ChampionshipPreviousRaceComponent,
    ChampionshipRankingComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ChampionshipComponent,
    ChampionshipPreviousRaceComponent,
    ChampionshipRankingComponent,
    HistoryComponent
  ]
})
export class ChampionshipModule { }
