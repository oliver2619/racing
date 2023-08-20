import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarSetupComponent } from './car-setup/car-setup.component';
import { CarSetupHelpComponent } from './car-setup-help/car-setup-help.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CarSetupComponent,
    CarSetupHelpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    CarSetupComponent,
    CarSetupHelpComponent
  ]
})
export class CarSetupModule { }
