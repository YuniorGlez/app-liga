import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jugador } from 'src/app/shared/models/Jugador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private http: HttpClient) { }

  lista(){
    const url = `${environment.api_base}players/`
    return this.http.get(url);
  }

  listaPaginacion(pagina: number){
    const url = `${environment.api_base}players/?_page=${pagina}&_limit=20`
    return this.http.get(url);
  }

  listaPorEquipo(id: string){
    const url = `${environment.api_base}players?teamId=${id}`
    return this.http.get(url);
  }

  busqueda(pagina, q: string){
    const url = `${environment.api_base}players/?_page=${pagina}&_limit=20&q=${q}`
    return this.http.get(url);
  }

  registrar(jugador: Jugador){
    const url = `${environment.api_base}players/`
    return this.http.post(url, jugador);
  }

  actualizar(jugador: Jugador, id: string){
    const url = `${environment.api_base}players/${id}/`
    return this.http.put(url, jugador);
  }

  eliminar(id: string){
    const url = `${environment.api_base}players/${id}`
    return this.http.delete(url);
  }
}
