import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RaceComponent } from './race/race.component';

@NgModule({
  declarations: [
    RaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RaceComponent
  ]
})
export class RaceModule { }
