import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaJugadorPage } from './lista-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: ListaJugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaJugadorPageRoutingModule {}
