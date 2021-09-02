import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { JugadorService } from 'src/app/core/services/jugador.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Equipo } from 'src/app/shared/models/Equipo';
import { Jugador } from 'src/app/shared/models/Jugador';

@Component({
  selector: 'app-edit-jugador',
  templateUrl: './edit-jugador.component.html',
  styleUrls: ['./edit-jugador.component.scss'],
})
export class EditJugadorComponent implements OnInit {

  @Input() data: Jugador;
  form: FormGroup;
  lista_equipo: Array<Equipo> = [];
  ruta_imagen: string;

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private equipoService: EquipoService,
    private jugadorService: JugadorService,
    private toastService: ToastService
  ) { 
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre_jugador: [this.data['Nombre del Jugador'], [Validators.required]],
      equipo: [this.data.teamId, [Validators.required]],
      imagen: [this.data.Avatar, [Validators.required]]
    })
    this.obtenerListaEquipo();
    this.ruta_imagen = this.data.Avatar;
  }

  obtenerListaEquipo(){
    this.equipoService.lista().subscribe((res: any) => {
      this.lista_equipo = res;
    }, error => console.log(error))
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
    let objJugador: Jugador = {
      "Nombre del Jugador": this.form.get('nombre_jugador').value,
      "Avatar": this.form.get('imagen').value,
      "teamId": this.form.get('equipo').value
    }
    this.jugadorService.actualizar(objJugador, this.data.id).subscribe((res) => {
      this.toastService.mostrarMensaje('Se actualizo el registro correctamente', 500)
      this.modalController.dismiss();
    }, error => {
      console.log(error)
    })
  }

}
