import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  arreglo: any[];

  transform(arreglo: any[], texto: string): any[] {
    if(texto == ''){
      return arreglo;
    }

    texto = texto.toLowerCase();
    return arreglo.filter((element: any) => {
      if(element['Nombre del equipo'] != null){
        if(element['Nombre del equipo'].toLowerCase().includes(texto)){
          return element;
        }
      }else{
        if(element['Nombre del Jugador'].toLowerCase().includes(texto)){
          return element;
        }
      }
       
     })
  }

}
