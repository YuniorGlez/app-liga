import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Equipo } from 'src/app/shared/models/Equipo';

@Component({
  selector: 'app-registro-equipo',
  templateUrl: './registro-equipo.component.html',
  styleUrls: ['./registro-equipo.component.scss'],
})
export class RegistroEquipoComponent implements OnInit {

  @Input() data: string;
  form: FormGroup;
  ruta_imagen: string;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private equipoService: EquipoService,
    private toastService: ToastService
  ) { 
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre_equipo: ['', [Validators.required]],
      liga: [this.data, [Validators.required]],
      logo: ['']
    })
  }

  visualizarImagen(){
    let nombre = this.form.get('nombre_equipo').value;
    this.ruta_imagen = `https://robohash.org/${nombre}.png?size=250x250&set=set1`;
    this.form.get('logo').setValue(this.ruta_imagen);
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  enviar() {
    this.visualizarImagen();
    let objEquipo: Equipo = {
      "Nombre del equipo": this.form.get('nombre_equipo').value,
      "Logo del Equipo": this.form.get('logo').value,
      "Liga": this.form.get('liga').value
    }
    this.equipoService.registrar(objEquipo).subscribe((res) => {
      this.toastService.mostrarMensaje('Se registro el equipo correctamente', 500)
      this.modalController.dismiss();
    }, error => {
      console.log(error)
    })
  }

}
