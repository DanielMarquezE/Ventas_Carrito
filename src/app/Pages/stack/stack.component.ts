import { Component, inject } from '@angular/core';
import { ArticuloPresentacionComponent } from '../../components/articulo-presentacion/articulo-presentacion.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderClienteComponent } from '../../components/header-cliente/header-cliente.component';
import { ArticulosService } from '../../Services/articulos.service';
import { TarjetaArticulo } from '../../Models/tarjetaArticulo';
import { Router } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,HeaderClienteComponent],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent {

  private articuloServicio=inject(ArticulosService)
  private cartServicio=inject(CarritoService)
  public listaCartArticulos:TarjetaArticulo[]=[]
  public displayedColumns:string[] = ["Codigo","Descripcion","Precio","Imagen","Stock","Sucursal","Accion"]


  obtenetListaCartArticulos(){
    this.articuloServicio.getInfoTarjetas().subscribe({
      next:(data)=>{
        if(data.length>0){
          this.listaCartArticulos=data;
          
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    if(localStorage.getItem('CliendId')==null){
      router.navigate([''])
    }
    this.obtenetListaCartArticulos();
    console.log(localStorage.getItem('CliendId'))
  }

  addtocart(articulo:TarjetaArticulo){
    return this.cartServicio.addArticulo(articulo)
  }


}
