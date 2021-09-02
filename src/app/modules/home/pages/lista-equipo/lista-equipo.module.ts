import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEquipoPageRoutingModule } from './lista-equipo-routing.module';

import { ListaEquipoPage } from './lista-equipo.page';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEquipoPageRoutingModule,
    PipesModule
  ],
  declarations: [ListaEquipoPage]
})
export class ListaEquipoPageModule {}
