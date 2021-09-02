import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'equipo/:id',
    loadChildren: () => import('./modules/home/pages/lista-equipo/lista-equipo.module').then( m => m.ListaEquipoPageModule)
  },
  {
    path: 'jugador/:id',
    loadChildren: () => import('./modules/home/pages/lista-jugador/lista-jugador.module').then( m => m.ListaJugadorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
