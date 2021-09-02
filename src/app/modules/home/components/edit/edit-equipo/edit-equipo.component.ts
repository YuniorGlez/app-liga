import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LigaService } from 'src/app/core/services/liga.service';
import { Equipo } from 'src/app/shared/models/Equipo';
import { Liga } from 'src/app/shared/models/Liga';

@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.scss'],
})
export class EditEquipoComponent implements OnInit {

  @Input() data: Equipo;
  form: FormGroup;
  lista_liga: Array<Liga> = [];
  ruta_imagen: string;
  // file: File;
  // photoSelected: string | ArrayBuffer;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private ligaService: LigaService,
    private equipoService: EquipoService
  ) { 
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre_equipo: [this.data['Nombre del equipo'], [Validators.required]],
      liga: [this.data.Liga, [Validators.required]],
      logo: [this.data['Logo del Equipo'], [Validators.required]]
    })
    this.obtenerListaLiga();
    this.ruta_imagen = this.data['Logo del Equipo'];
  }

  obtenerListaLiga(){
    this.ligaService.lista().subscribe((res: any) => {
      this.lista_liga = res;
    }, error => console.log(error))
  }

  // En caso de que el servidor permita guardar imagenes
  /*onPhotoSelected(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // Image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }*/

  visualizarImagen(){
    let nombre = this.form.get('nombre_equipo').value;
    this.ruta_imagen = `https://robohash.org/${nombre}.png?size=250x250&set=set1`;
    this.form.get('logo').setValue(this.ruta_imagen);
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  enviar() {
    let objEquipo: Equipo = {
      "Nombre del equipo": this.form.get('nombre_equipo').value,
      "Logo del Equipo": this.form.get('logo').value,
      "Liga": this.form.get('liga').value
    }
    this.equipoService.actualizar(objEquipo, this.data.id).subscribe((res) => {
      this.modalController.dismiss();
    }, error => {
      console.log(error)
    })
  }

}
