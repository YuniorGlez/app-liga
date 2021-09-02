import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'liga',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'equipo',
        loadChildren: () => import('../equipo/equipo.module').then( m => m.EquipoPageModule)
      },
      {
        path: 'jugador',
        loadChildren: () => import('../jugador/jugador.module').then( m => m.JugadorPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/liga',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
