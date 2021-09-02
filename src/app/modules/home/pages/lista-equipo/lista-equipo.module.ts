import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEquipoPageRoutingModule } from './lista-equipo-routing.module';

import { ListaEquipoPage } from './lista-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEquipoPageRoutingModule
  ],
  declarations: [ListaEquipoPage]
})
export class ListaEquipoPageModule {}
