import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../Settings/appSettings';
import { Cliente } from '../Models/Cliente';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient)
  private apiUrl:string = appSettings.apiUrl+"Clientes/";

  constructor() { }

  list(){
    console.log(this.apiUrl+"getClientes");
      return this.http.get<Cliente[]>(this.apiUrl+"getClientes")
  }

  obtener(id:number){
   
    return this.http.get<Cliente>(`${this.apiUrl}getClientesById?idCliente=${id}`)
  }

  crear(objeto:Cliente){
    return this.http.post<Cliente>(this.apiUrl+"insertCliente",objeto)
  }

  editar(objeto:Cliente){
    return this.http.put<Cliente>(this.apiUrl+"updateCliente",objeto)
  }

  eliminar(id:number){
    return this.http.delete<Cliente>(`${this.apiUrl}deleteCliente?idCliente=${id}`)
  }

  validateUser(objeto:User){
    return this.http.post<User>(this.apiUrl+"validateCliente",objeto)
  }

}
