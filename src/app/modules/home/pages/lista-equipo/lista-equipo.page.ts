import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { Equipo } from 'src/app/shared/models/Equipo';
import { EditEquipoComponent } from '../../components/edit/edit-equipo/edit-equipo.component';
import { RegistroEquipoComponent } from '../../components/registro/registro-equipo/registro-equipo.component';

@Component({
  selector: 'app-lista-equipo',
  templateUrl: './lista-equipo.page.html',
  styleUrls: ['./lista-equipo.page.scss'],
})
export class ListaEquipoPage implements OnInit {

  lista_equipo: Array<Equipo> = [];
  id: string;

  constructor(
    private equipoService: EquipoService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.obtenerListaEquipo(this.id);
  }

  obtenerListaEquipo(id: string) {
    this.equipoService.listaPorLiga(id).subscribe((res: any) => {
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
        data: this.id,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.obtenerListaEquipo(this.id);
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
      this.obtenerListaEquipo(this.id);
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

}
