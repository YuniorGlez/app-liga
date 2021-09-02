import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { Equipo } from 'src/app/shared/models/Equipo';
import { EditEquipoComponent } from '../home/components/edit/edit-equipo/edit-equipo.component';
import { RegistroEquipoComponent } from '../home/components/registro/registro-equipo/registro-equipo.component';

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

  constructor(
    private equipoService: EquipoService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.obtenerListaEquipo(this.pagina);
  }

  obtenerListaEquipo(pagina: number) {
    this.equipoService.listaPaginacion(pagina).subscribe((res: any) => {
      this.limite = res.length;
      this.lista_equipo = this.lista_equipo.concat(res);
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
      this.pagina = 1;
      this.obtenerListaEquipo(this.pagina);
    });
    return await modal.present();
  }

  eliminar(equipo: Equipo){
    this.equipoService.eliminar(equipo.id).subscribe((res) =>{
      console.log(res);
      let pos = this.lista_equipo.indexOf(equipo);
      if(pos != -1){
        this.lista_equipo.splice(pos, 1);
      }
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
