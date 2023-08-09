import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CarSetupComponent } from './car-setup/car-setup.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './weather/weather.component';
import { SelectTeamComponent } from './select-team/select-team.component';
import { RaceComponent } from './race/race.component';
import { DigitalNumberComponent } from './digital-number/digital-number.component';
import { HealthComponent } from './health/health.component';
import { ButtonDirective } from './button.directive';
import { IconButtonDirective } from './icon-button.directive';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ChallengeComponent,
    CarSetupComponent,
    SettingsComponent,
    WeatherComponent,
    SelectTeamComponent,
    RaceComponent,
    DigitalNumberComponent,
    HealthComponent,
    ButtonDirective,
    IconButtonDirective,
    AboutComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
