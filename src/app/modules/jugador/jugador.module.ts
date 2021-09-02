import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadorPageRoutingModule } from './jugador-routing.module';

import { JugadorPage } from './jugador.page';
import { RegistroJugadorComponent } from './components/registro/registro-jugador/registro-jugador.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JugadorPageRoutingModule
  ],
  declarations: [JugadorPage, RegistroJugadorComponent],
  entryComponents: [RegistroJugadorComponent]
})
export class JugadorPageModule {}
