import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuertasPage } from './puertas.page';

const routes: Routes = [
  {
    path: '',
    component: PuertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuertasPageRoutingModule {}
