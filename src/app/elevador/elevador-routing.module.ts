import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElevadorPage } from './elevador.page';

const routes: Routes = [
  {
    path: '',
    component: ElevadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElevadorPageRoutingModule {}
