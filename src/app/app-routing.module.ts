import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';  
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'luces',
    loadChildren: () => import('./luces/luces.module').then(m => m.LucesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sensores',
    loadChildren: () => import('./sensores/sensores.module').then(m => m.SensoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'soporte',
    loadChildren: () => import('./soporte/soporte.module').then(m => m.SoportePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then(m => m.NosotrosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'puertas',
    loadChildren: () => import('./puertas/puertas.module').then(m => m.PuertasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'elevador',
    loadChildren: () => import('./elevador/elevador.module').then(m => m.ElevadorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
