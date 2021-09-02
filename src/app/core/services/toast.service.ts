import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async mostrarMensaje(mensaje: string, duracion: number){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion
    })

    toast.present();
  }

  async mostrarMensajeErrorConexion(mensaje: string, duracion: number){
    const toast = await this.toastController.create({
      message: 'No esta conectado a internet',
      duration: duracion
    })

    toast.present();
  }
}
