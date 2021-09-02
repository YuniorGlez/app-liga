import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { JugadorService } from 'src/app/core/services/jugador.service';
import { Jugador } from 'src/app/shared/models/Jugador';
import { EditJugadorComponent } from '../home/components/edit/edit-jugador/edit-jugador.component';
import { RegistroJugadorComponent } from '../home/components/registro/registro-jugador/registro-jugador.component';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.page.html',
  styleUrls: ['./jugador.page.scss'],
})
export class JugadorPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  lista_jugador: Array<Jugador> = [];
  pagina: number = 1;
  limite: number = -1;
  texto_busqueda: string = '';

  constructor(
    private jugadorService: JugadorService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.obtenerListaJugador(this.pagina);
  }

  obtenerListaJugador(pagina: number) {
    this.jugadorService.busqueda(pagina, this.texto_busqueda).subscribe((res: any) => {
      this.limite = res.length;
      this.lista_jugador = this.lista_jugador.concat(res);
    }, error => console.log(error))
  }

  buscar(event){
    this.texto_busqueda = event.detail.value;
    this.jugadorService.busqueda(this.pagina, this.texto_busqueda).subscribe((res: any) =>{
      this.lista_jugador = res;
    }, error => console.log(error))
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
    });
    modal.onDidDismiss().then((data) => {
      this.pagina = 1;
      this.obtenerListaJugador(this.pagina);
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
      this.pagina = 1;
      this.obtenerListaJugador(this.pagina);
    });
    return await modal.present();
  }

  eliminar(jugador: Jugador){
    this.jugadorService.eliminar(jugador.id).subscribe((res) =>{
      console.log(res);
      let pos = this.lista_jugador.indexOf(jugador);
      if(pos != -1){
        this.lista_jugador.splice(pos, 1);
      }
    }, error => console.log(error))
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.pagina = this.pagina + 1;
      this.obtenerListaJugador(this.pagina);

      // Desactiva el infinite scroll
      if (this.limite == 0) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
