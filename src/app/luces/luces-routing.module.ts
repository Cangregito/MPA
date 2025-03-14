import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LucesPage } from './luces.page';

const routes: Routes = [
  {
    path: '',
    component: LucesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LucesPageRoutingModule {}
