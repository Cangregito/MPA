import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadosPageRoutingModule } from './estados-routing.module';

import { EstadosPage } from './estados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadosPageRoutingModule
  ],
  //declarations: [EstadosPage]
})
export class EstadosPageModule {}
