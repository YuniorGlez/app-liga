import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEquipoPage } from './lista-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEquipoPageRoutingModule {}
