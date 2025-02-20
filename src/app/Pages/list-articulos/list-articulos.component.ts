import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ArticulosService } from '../../Services/articulos.service';
import { TiendasService } from '../../Services/tiendas.service';
import { Articulo } from '../../Models/Articulo';
import { Router } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-list-articulos',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MenuComponent],
  templateUrl: './list-articulos.component.html',
  styleUrl: './list-articulos.component.css'
})
export class ListArticulosComponent {

  private articuloServicio = inject(ArticulosService);
  private tiendaSercicio = inject(TiendasService);
  public listaArticulos: Articulo[]=[];
  public displayedColumns:string[] = ["Id","Codigo","Descripcion","Precio","Imagen","Stock","Sucursal","FechaCreacion","Accion"]

  obtenerArticulos(){
    this.articuloServicio.list().subscribe({
      next:(data)=>{
        if(data.length>0){
          console.log(data)
          this.listaArticulos=data;
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
    this.obtenerArticulos();
  }

    nuevo(){
      this.router.navigate(['/articulo',0])
    }
  
    editar(objeto:Articulo){
      this.router.navigate(['/articulo',objeto.id]);
    }

    eliminar(objeto:Articulo){
        if(confirm("Desea Eliminiar el Articulo: " + objeto.descripcion)){
          this.articuloServicio.eliminar(objeto.id).subscribe({
            next:(data)=>{
              if(data!=null){
                this.obtenerArticulos();
              }
              else{
                alert("No se pudo Eliminar el Articulo")
              }
            },
            error:(err)=>{
              console.log(err.message)
            }
          })
        }
      }
  

}
