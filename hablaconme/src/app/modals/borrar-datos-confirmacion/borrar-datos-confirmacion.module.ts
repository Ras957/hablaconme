import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BorrarDatosConfirmacionPage } from './borrar-datos-confirmacion.page';

const routes: Routes = [
  {
    path: '',
    component: BorrarDatosConfirmacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class BorrarDatosConfirmacionPageModule {}
