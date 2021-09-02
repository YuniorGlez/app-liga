import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaJugadorPageRoutingModule } from './lista-jugador-routing.module';

import { ListaJugadorPage } from './lista-jugador.page';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaJugadorPageRoutingModule,
    PipesModule
  ],
  declarations: [ListaJugadorPage]
})
export class ListaJugadorPageModule {}
