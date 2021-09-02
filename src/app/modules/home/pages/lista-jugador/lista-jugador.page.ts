import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { JugadorService } from 'src/app/core/services/jugador.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Jugador } from 'src/app/shared/models/Jugador';
import { EditJugadorComponent } from '../../components/edit/edit-jugador/edit-jugador.component';
import { RegistroJugadorComponent } from '../../components/registro/registro-jugador/registro-jugador.component';

@Component({
  selector: 'app-lista-jugador',
  templateUrl: './lista-jugador.page.html',
  styleUrls: ['./lista-jugador.page.scss'],
})
export class ListaJugadorPage implements OnInit {

  lista_jugador: Array<Jugador> = [];
  id: string;
  texto_busqueda: string = '';

  constructor(
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.obtenerListaJugador(this.id);
  }

  obtenerListaJugador(id: string) {
    this.jugadorService.listaPorEquipo(id).subscribe((res: any) => {
      this.lista_jugador = res;
    }, error => console.log(error))
  }

  buscar(event){
    this.texto_busqueda = event.detail.value;
  }

  abrirSlide(item: any) {
    let a = Array.prototype.slice.call( item.el.children )
    a.map((val)=>{
      val.open();
    })
  }

  cerrarSlide(item: any) {
    let a = Array.prototype.slice.call( item.el.children )
    a.map((val)=>{
      val.close();
    })
  }

  async registrar(){
    const modal = await this.modalController.create({
      component: RegistroJugadorComponent,
      componentProps: {
        data: this.id,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.obtenerListaJugador(this.id);
    });
    return await modal.present();
  }

  async editar(equipo: Jugador){
    const modal = await this.modalController.create({
      component: EditJugadorComponent,
      componentProps: {
        data: equipo,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.obtenerListaJugador(this.id);
    });
    return await modal.present();
  }

  eliminar(jugador: Jugador){
    this.jugadorService.eliminar(jugador.id).subscribe((res) =>{
      let pos = this.lista_jugador.indexOf(jugador);
      if(pos != -1){
        this.lista_jugador.splice(pos, 1);
      }
      this.toastService.mostrarMensaje('Se elimino el jugador', 500);
    }, error => console.log(error))
  }

}
