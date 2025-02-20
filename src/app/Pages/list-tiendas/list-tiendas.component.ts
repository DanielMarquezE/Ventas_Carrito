import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MenuComponent } from '../../components/menu/menu.component';
import { TiendasService } from '../../Services/tiendas.service';
import { Tienda } from '../../Models/Tienda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tiendas',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MenuComponent],
  templateUrl: './list-tiendas.component.html',
  styleUrl: './list-tiendas.component.css'
})
export class ListTiendasComponent {

  private tiendasServicio = inject(TiendasService);
  public listaTiendas:Tienda[]=[];
  public displayedColumns:string[] = ["Id","Sucursal","Direccion","Accion"];

  obtenerTiendas(){
     this.tiendasServicio.list().subscribe({
      next:(data)=>{
        if(data.length>0){
          console.log(data)
          this.listaTiendas=data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    if(localStorage.getItem('AdminID')==null){
      router.navigate([''])
    } 
    this.obtenerTiendas()
  }

  nuevo(){
    this.router.navigate(['/tienda',0])
  }

  editar(objeto:Tienda){
    this.router.navigate(['/tienda',objeto.id])
  }

  eliminar(objeto:Tienda){
      if(confirm("Desea Eliminiar la Tienda: " + objeto.sucursal)){
        this.tiendasServicio.eliminar(objeto.id).subscribe({
          next:(data)=>{
            if(data!=null){
              this.obtenerTiendas();
            }
            else{
              alert("No se pudo Eliminar la Tienda")
            }
          },
          error:(err)=>{
            console.log(err.message)
          }
        })
      }
    }

}
