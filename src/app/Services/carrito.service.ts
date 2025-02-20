import { inject, Injectable } from '@angular/core';
import { TarjetaArticulo } from '../Models/tarjetaArticulo';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../Settings/appSettings';
import { Venta } from '../Models/Venta';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ListaDeCompras } from '../Models/ListaDeCompras';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private myList:TarjetaArticulo[]=[]

  private http=inject(HttpClient)
  private apiUrl:string=appSettings.apiUrl+"Ventas/"
  private myCart = new BehaviorSubject<TarjetaArticulo[]>([])
  private date= new Date();
  private fecha:string = formatDate(this.date, 'yyyy-MM-dd', 'en');
  myCart$=this.myCart.asObservable();

  constructor(private router:Router) { }

  addArticulo(articulo:TarjetaArticulo){

    if(this.myList.length===0){
      articulo.cantidad=1
      this.myList.push(articulo);
      this.myCart.next(this.myList);
    }else{
      const producMod=this.myList.find((element)=>{
        return element.id === articulo.id
      })

      if(producMod){
        if(producMod.cantidad<articulo.stock){
          producMod.cantidad=producMod.cantidad+1;
          this.myCart.next(this.myList);
        }else{
          alert("No hay suficientes articulos en stock")
        }
        
      }else{
        articulo.cantidad=1;
        this.myList.push(articulo);
        this.myCart.next(this.myList);
      }

    }
    
  }

  eliminarDelCarrito(id:number){
    this.myList = this.myList.filter((articulo)=>{
      return articulo.id != id
    })
    this.myCart.next(this.myList)
  }

  calcularTotal(){
    const total= this.myList.reduce(function (acc, articulo){return acc + (articulo.cantidad * articulo.precio);},0)
    return total;
  }

  vaciarCarrito(){
    this.myList=[];
    this.myCart.next(this.myList)
  }

  realizarCompra(){

      let idC:string=localStorage.getItem('CliendId')!

      for(let articulo of this.myList){
        const objet:Venta={
          id:0,
          idProducto : articulo.id,
          idCliente : +idC,
          cantidadProducto : articulo.cantidad,
          totalVenta : (articulo.cantidad * articulo.precio),
          fechaVenta : this.fecha
        }
        this.crearVenta(objet).subscribe({
          next:(data)=>{
            if(data==null){
              alert("Error Al Crear")
            }
          },error:(err)=>{
              console.log(err.message)
          }
      })
      }
      this.vaciarCarrito();
      this.router.navigate(["/compras"])
  }

  listVentas(){
    return this.http.get<Venta[]>(this.apiUrl+"getVentas")
  }

  getListaDeCompras(idCliente:number){
    return this.http.get<ListaDeCompras[]>(`${this.apiUrl}GetListaDeCompras?idCliente=${idCliente}`)
  }

  crearVenta(objeto:Venta){
    return this.http.post<Venta>(this.apiUrl+"insertVenta",objeto)
  }

}
