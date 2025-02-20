import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../Settings/appSettings';
import { Tienda } from '../Models/Tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  private http = inject(HttpClient)
  private apiUrl:string=appSettings.apiUrl+"Tiendas/"

  constructor() { }

  list(){
    return this.http.get<Tienda[]>(this.apiUrl+"getTiendas");
  }

  obtener(id:number){
    return this.http.get<Tienda>(`${this.apiUrl}getTiendasById?idTienda=${id}`);
  }

  crear(objeto:Tienda){
      return this.http.post<Tienda>(this.apiUrl+"insertTienda",objeto)
  }

  editar(objeto:Tienda){
    return this.http.put<Tienda>(this.apiUrl+"updateTienda",objeto)
  }

  eliminar(id:number){
    return this.http.delete<Tienda>(`${this.apiUrl}deleteTienda?idTienda=${id}`)
  }

}
