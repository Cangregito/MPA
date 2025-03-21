import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'luces',
    loadChildren: () => import('./luces/luces.module').then(m => m.LucesPageModule)
  },
  {
    path: 'sensores',
    loadChildren: () => import('./sensores/sensores.module').then(m => m.SensoresPageModule)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./soporte/soporte.module').then(m => m.SoportePageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then(m => m.NosotrosPageModule)
  },
  {
    path: 'puertas',
    loadChildren: () => import('./puertas/puertas.module').then(m => m.PuertasPageModule)
  },
  {
    path: 'elevador',
    loadChildren: () => import('./elevador/elevador.module').then(m => m.ElevadorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
