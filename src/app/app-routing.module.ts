import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [{
  path: 'about',
  component: AboutComponent
}, {
  path: 'challenge',
  component: ChallengeComponent
}, {
  path: 'settings',
  component: SettingsComponent
}, {
  path: 'weather',
  component: WeatherComponent
}, {
  path: '**',
  redirectTo: '/challenge'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
