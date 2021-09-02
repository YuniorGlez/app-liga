import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { JugadorService } from 'src/app/core/services/jugador.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Jugador } from 'src/app/shared/models/Jugador';

@Component({
  selector: 'app-registro-jugador',
  templateUrl: './registro-jugador.component.html',
  styleUrls: ['./registro-jugador.component.scss'],
})
export class RegistroJugadorComponent implements OnInit {

  @Input() data: string;
  form: FormGroup;
  ruta_imagen: string;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private jugadorService: JugadorService,
    private toastService: ToastService
  ) { 
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre_jugador: ['', [Validators.required]],
      equipo: [this.data, [Validators.required]],
      imagen: ['']
    })
  }

  visualizarImagen(){
    let nombre = this.form.get('nombre_jugador').value;
    this.ruta_imagen = `https://robohash.org/${nombre}.png?size=250x250&set=set1`;
    this.form.get('imagen').setValue(this.ruta_imagen);
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  enviar() {
    this.visualizarImagen();
    let objJugador: Jugador = {
      "Nombre del Jugador": this.form.get('nombre_jugador').value,
      "Avatar": this.form.get('imagen').value,
      "teamId": this.form.get('equipo').value
    }
    this.jugadorService.registrar(objJugador).subscribe((res) => {
      this.toastService.mostrarMensaje('Se registro el jugador correctamente', 500)
      this.modalController.dismiss();
    }, error => {
      console.log(error)
    })
  }

}
