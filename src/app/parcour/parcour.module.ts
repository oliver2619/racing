import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcourComponent } from './parcour/parcour.component';
import { SharedModule } from '../shared/shared.module';
import { SaveParcourComponent } from './save-parcour/save-parcour.component';
import { LoadParcourComponent } from './load-parcour/load-parcour.component';
import { RouterModule } from '@angular/router';
import { DeleteParcourComponent } from './delete-parcour/delete-parcour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ParcourComponent,
    SaveParcourComponent,
    LoadParcourComponent,
    DeleteParcourComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ParcourComponent,
    SaveParcourComponent,
    LoadParcourComponent
  ]
})
export class ParcourModule { }
