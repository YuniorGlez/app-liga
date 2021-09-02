import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo } from 'src/app/shared/models/Equipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  lista(){
    const url = `${environment.api_base}teams/`
    return this.http.get(url);
  }

  listaPaginacion(pagina: number){
    const url = `${environment.api_base}teams/?_page=${pagina}&_limit=20`
    return this.http.get(url);
  }

  listaPorLiga(id: string){
    const url = `${environment.api_base}teams?Liga=${id}`
    return this.http.get(url);
  }

  registrar(equipo: Equipo){
    const url = `${environment.api_base}teams/`
    return this.http.post(url, equipo);
  }

  actualizar(equipo: Equipo, id: string){
    const url = `${environment.api_base}teams/${id}/`
    return this.http.put(url, equipo);
  }

  eliminar(id: string){
    const url = `${environment.api_base}teams/${id}`
    return this.http.delete(url);
  }
}
