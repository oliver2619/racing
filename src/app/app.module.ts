import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsComponent } from './settings/settings.component';
import { SelectTeamComponent } from './select-team/select-team.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameModeComponent } from './game-mode/game-mode.component';
import { ChallengeModule } from './challenge/challenge.module';
import { SharedModule } from './shared/shared.module';
import { CarSetupModule } from './car-setup/car-setup.module';
import { ChampionshipModule } from './championship/championship.module';
import { ParcourModule } from './parcour/parcour.module';
import { RaceModule } from './race/race.module';
import { WeatherModule } from './weather/weather.module';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    SelectTeamComponent,
    AboutComponent,
    GameModeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    SharedModule,
    CarSetupModule,
    ChallengeModule,
    ChampionshipModule,
    ParcourModule,
    RaceModule,
    WeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
