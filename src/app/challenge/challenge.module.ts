import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChallengeComponent } from './challenge/challenge.component';

@NgModule({
  declarations: [
    ChallengeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ChallengeComponent
  ]
})
export class ChallengeModule { }
