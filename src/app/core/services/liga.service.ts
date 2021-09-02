import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LigaService {

  constructor(
    private http: HttpClient
  ) { }

  lista(){
    const url = `${environment.api_base}leagues/`
    return this.http.get(url);
  }
}
