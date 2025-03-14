import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElevadorPageRoutingModule } from './elevador-routing.module';

import { ElevadorPage } from './elevador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElevadorPageRoutingModule
  ],
  //declarations: [ElevadorPage]
})
export class ElevadorPageModule {}
