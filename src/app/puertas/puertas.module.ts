import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuertasPageRoutingModule } from './puertas-routing.module';

import { PuertasPage } from './puertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuertasPageRoutingModule
  ],
  //declarations: [PuertasPage]
})
export class PuertasPageModule {}
