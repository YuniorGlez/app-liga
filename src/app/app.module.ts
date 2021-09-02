import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEquipoComponent } from './modules/home/components/edit/edit-equipo/edit-equipo.component';
import { RegistroEquipoComponent } from './modules/home/components/registro/registro-equipo/registro-equipo.component';
import { EditJugadorComponent } from './modules/home/components/edit/edit-jugador/edit-jugador.component';
import { RegistroJugadorComponent } from './modules/home/components/registro/registro-jugador/registro-jugador.component';

@NgModule({
  declarations: [AppComponent, EditEquipoComponent, RegistroEquipoComponent, EditJugadorComponent, RegistroJugadorComponent],
  entryComponents: [EditEquipoComponent, RegistroEquipoComponent, EditJugadorComponent, RegistroJugadorComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
