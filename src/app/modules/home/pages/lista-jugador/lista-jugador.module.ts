import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaJugadorPageRoutingModule } from './lista-jugador-routing.module';

import { ListaJugadorPage } from './lista-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaJugadorPageRoutingModule
  ],
  declarations: [ListaJugadorPage]
})
export class ListaJugadorPageModule {}
