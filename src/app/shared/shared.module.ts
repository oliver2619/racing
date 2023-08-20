import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ButtonDirective } from './button.directive';
import { IconButtonDirective } from './icon-button.directive';
import { IconImgDirective } from './icon-img.directive';
import { DigitalNumberComponent } from './digital-number/digital-number.component';
import { HealthComponent } from './health/health.component';
import { RouterModule } from '@angular/router';
import { ParcourCanvasComponent } from './parcour-canvas/parcour-canvas.component';

@NgModule({
  declarations: [
    ButtonDirective,
    IconButtonDirective,
    IconImgDirective,
    DigitalNumberComponent,
    NavBarComponent,
    HealthComponent,
    ParcourCanvasComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonDirective,
    IconButtonDirective,
    IconImgDirective,
    DigitalNumberComponent,
    NavBarComponent,
    HealthComponent,
    ParcourCanvasComponent
  ]
})
export class SharedModule { }
