import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../Settings/appSettings';
import { Articulo } from '../Models/Articulo';
import { TarjetaArticulo } from '../Models/tarjetaArticulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private http=inject(HttpClient);
  private apiUrl:string=appSettings.apiUrl+"Articulos/"
  
  constructor() { }

  list(){
      console.log(this.apiUrl+"getArticulos");
        return this.http.get<Articulo[]>(this.apiUrl+"getArticulos")
    }
  
    obtener(id:number){
     
      return this.http.get<Articulo>(`${this.apiUrl}getArticulosById?idArticulo=${id}`)
    }
  
    crear(objeto:Articulo){
      console.log(objeto.fechacreacion)
      return this.http.post<Articulo>(this.apiUrl+"insertArticulo",objeto)
    }
  
    editar(objeto:Articulo){
      return this.http.put<Articulo>(this.apiUrl+"updateArticulo",objeto)
    }
  
    eliminar(id:number){
      return this.http.delete<Articulo>(`${this.apiUrl}deleteArticulo?idArticulo=${id}`)
    }

    getInfoTarjetas(){
      return this.http.get<TarjetaArticulo[]>(this.apiUrl+"getListCartArticulo")
    }
}
