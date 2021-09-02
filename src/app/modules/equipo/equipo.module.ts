import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EquipoPageRoutingModule } from './equipo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipoPage } from './equipo.page';
import { RegistroEquipoComponent } from './components/registro/registro-equipo/registro-equipo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    EquipoPageRoutingModule,
  ],
  exports: [],
  declarations: [EquipoPage, RegistroEquipoComponent],
  entryComponents: [RegistroEquipoComponent]
})
export class EquipoPageModule {}
