import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WeatherComponent
  ]
})
export class WeatherModule { }
