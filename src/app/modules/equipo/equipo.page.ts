import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Equipo } from 'src/app/shared/models/Equipo';
import { EditEquipoComponent } from '../home/components/edit/edit-equipo/edit-equipo.component';
import { RegistroEquipoComponent } from './components/registro/registro-equipo/registro-equipo.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  lista_equipo: Array<Equipo> = [];
  pagina: number = 1;
  limite: number = -1;
  texto_busqueda: string = '';

  constructor(
    private equipoService: EquipoService,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.obtenerListaEquipo(this.pagina);
  }

  obtenerListaEquipo(pagina: number) {
    this.equipoService.busqueda(pagina, this.texto_busqueda).subscribe((res: any) => {
      this.limite = res.length;
      this.lista_equipo = this.lista_equipo.concat(res);
    }, error => console.log(error))
  }

  buscar(event){
    this.texto_busqueda = event.detail.value;
    this.equipoService.busqueda(this.pagina, this.texto_busqueda).subscribe((res: any) =>{
      this.lista_equipo = res;
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
      component: RegistroEquipoComponent,
      componentProps: {
      },
    });
    modal.onDidDismiss().then((data) => {
      this.pagina = 1;
      this.obtenerListaEquipo(this.pagina);
    });
    return await modal.present();
  }

  async editar(equipo: Equipo){
    const modal = await this.modalController.create({
      component: EditEquipoComponent,
      componentProps: {
        data: equipo,
      },
    });
    modal.onDidDismiss().then((data) => {
      if(data){
        this.lista_equipo = [];
        this.pagina = 1;
        this.obtenerListaEquipo(this.pagina);
      }
    });
    return await modal.present();
  }

  eliminar(equipo: Equipo){
    this.equipoService.eliminar(equipo.id).subscribe((res) =>{
      this.toastService.mostrarMensaje('Se elimino el equipo', 500);
      this.lista_equipo = [];
      this.pagina = 1;
      this.obtenerListaEquipo(this.pagina);
    }, error => console.log(error))
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.pagina = this.pagina + 1;
      this.obtenerListaEquipo(this.pagina);

      // Desactiva el infinite scroll
      if (this.limite == 0) {
        event.target.disabled = true;
      }
    }, 500);
  }


}
