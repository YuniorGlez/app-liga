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

@NgModule({
  declarations: [AppComponent, EditEquipoComponent, RegistroEquipoComponent],
  entryComponents: [EditEquipoComponent, RegistroEquipoComponent],
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
