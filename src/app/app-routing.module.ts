import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { canActivateChampionship, canActivateChampionshipRaceResult, canActivateParcour, canActivateRace, canActivateSetupCar, canActivateWeather, canModifyParcour } from './app.guard';
import { CarSetupHelpComponent } from './car-setup/car-setup-help/car-setup-help.component';
import { CarSetupComponent } from './car-setup/car-setup/car-setup.component';
import { ChallengeComponent } from './challenge/challenge/challenge.component';
import { ChampionshipPreviousRaceComponent } from './championship/championship-previous-race/championship-previous-race.component';
import { ChampionshipRankingComponent } from './championship/championship-ranking/championship-ranking.component';
import { ChampionshipComponent } from './championship/championship/championship.component';
import { HistoryComponent } from './championship/history/history.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import { DeleteParcourComponent } from './parcour/delete-parcour/delete-parcour.component';
import { LoadParcourComponent } from './parcour/load-parcour/load-parcour.component';
import { ParcourComponent } from './parcour/parcour/parcour.component';
import { SaveParcourComponent } from './parcour/save-parcour/save-parcour.component';
import { RaceComponent } from './race/race/race.component';
import { SelectTeamComponent } from './select-team/select-team.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './weather/weather/weather.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: GameModeComponent
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: 'challenge',
  component: ChallengeComponent
}, {
  path: 'championship',
  component: ChampionshipComponent,
  canActivate: [canActivateChampionship],
  children: [{
    path: 'history',
    component: HistoryComponent
  }, {
    path: 'previousRace',
    component: ChampionshipPreviousRaceComponent,
    canActivate: [canActivateChampionshipRaceResult]
  }, {
    path: 'ranking',
    component: ChampionshipRankingComponent
  }, {
    path: '**',
    redirectTo: 'ranking'
  }]
}, {
  path: 'newChampionship',
  component: SelectTeamComponent,
  data: {championship: true}
}, {
  path: 'newSingleRace',
  component: SelectTeamComponent,
  data: {championship: false}
}, {
  path: 'parcour',
  pathMatch: 'full',
  component: ParcourComponent,
  canActivate: [canActivateParcour]
}, {
  path: 'parcour/delete',
  component: DeleteParcourComponent,
  canActivate: [canModifyParcour]
}, {
  path: 'parcour/load',
  component: LoadParcourComponent,
  canActivate: [canModifyParcour]
}, {
  path: 'parcour/save',
  component: SaveParcourComponent,
  canActivate: [canModifyParcour]
}, {
  path: 'race',
  component: RaceComponent,
  canActivate: [canActivateRace]
}, {
  path: 'settings',
  component: SettingsComponent
}, {
  path: 'setup',
  pathMatch: 'full',
  component: CarSetupComponent,
  canActivate: [canActivateSetupCar]
}, {
  path: 'setup/help',
  component: CarSetupHelpComponent,
  canActivate: [canActivateSetupCar]
}, {
  path: 'weather',
  component: WeatherComponent,
  canActivate: [canActivateWeather]
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
