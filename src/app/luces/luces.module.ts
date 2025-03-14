import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LucesPageRoutingModule } from './luces-routing.module';

import { LucesPage } from './luces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LucesPageRoutingModule
  ],
  //declarations: [LucesPage]
})
export class LucesPageModule {}
