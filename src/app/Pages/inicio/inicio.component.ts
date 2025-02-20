import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Models/Cliente';
import { Router } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MenuComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private clienteServicio = inject(ClienteService);
  public listaclientes:Cliente[]= [];
  public displayedColumns:string[] = ['Id','Nombres','Apellidos','Direccion','UserName','Password','Accion'];

  obtenerClientes(){
    this.clienteServicio.list().subscribe({
      next:(data)=>{
        if(data.length>0){
          console.log(data)
          this.listaclientes=data;
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
      this.obtenerClientes();
  }

  nuevo(){
    this.router.navigate(['/cliente',0])
  }

  editar(objeto:Cliente){
    this.router.navigate(['/cliente',objeto.id]);
  }

  eliminar(objeto:Cliente){
    if(confirm("Desea Eliminiar al Cliente: " + objeto.nombres)){
      this.clienteServicio.eliminar(objeto.id).subscribe({
        next:(data)=>{
          if(data!=null){
            this.obtenerClientes();
          }
          else{
            alert("No se pudo Eliminar al Cliente")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

}
