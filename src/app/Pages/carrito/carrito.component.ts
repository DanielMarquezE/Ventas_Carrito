import { Component, inject } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderClienteComponent } from '../../components/header-cliente/header-cliente.component';
import { TarjetaArticulo } from '../../Models/tarjetaArticulo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,HeaderClienteComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  private carritoServicio=inject(CarritoService)
  public total:number=0;

  public displayedColumns:string[] = ["Codigo","Descripcion","Precio","Cantidad","Imagen","Stock","Sucursal","Accion"]

  myCart$=this.carritoServicio.myCart$
  constructor(private router:Router) {
    if(localStorage.getItem('CliendId')==null){
      router.navigate([''])
    }
    console.log(this.myCart$)
  }

  calcularTotal(){
    const resul=this.carritoServicio.calcularTotal()
    return resul;
  }

  eliminarDelCarrito(id:number){
    this.carritoServicio.eliminarDelCarrito(id);
  }

  vaciarCarrito(){
    this.carritoServicio.vaciarCarrito();
  }

  realizarCompra(){
    this.carritoServicio.realizarCompra();
  }
 

}
