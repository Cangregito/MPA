import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadosPage } from './estados.page';

const routes: Routes = [
  {
    path: '',
    component: EstadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadosPageRoutingModule {}
