import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderClienteComponent } from '../../components/header-cliente/header-cliente.component';
import { CarritoService } from '../../Services/carrito.service';
import { Venta } from '../../Models/Venta';
import { Router } from '@angular/router';
import { ListaDeCompras } from '../../Models/ListaDeCompras';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,HeaderClienteComponent],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {

  private cartServicio=inject(CarritoService);
  public lsitaDeVentas:ListaDeCompras[]=[]
  public displayedColumns:string[] = ["id","CodeProducto","NombreCliente","imagen","CantidadProducto","TotalVenta","FechaVenta"]

  obtenerListaDeVemtas(idCliente:number){
    this.cartServicio.getListaDeCompras(idCliente).subscribe({
      next:(data)=>{
        if(data.length>0){
          this.lsitaDeVentas=data;
          
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
    this.obtenerListaDeVemtas(+localStorage.getItem('CliendId')!) 
  }
    



}
