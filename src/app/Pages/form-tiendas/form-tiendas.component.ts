import { Component, inject, Input, OnInit } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import{ FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms'
import { TiendasService } from '../../Services/tiendas.service';
import { Router } from '@angular/router';
import { Tienda } from '../../Models/Tienda';
import { MenuComponent } from '../../components/menu/menu.component';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-form-tiendas',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MenuComponent,MatCardModule],
  templateUrl: './form-tiendas.component.html',
  styleUrl: './form-tiendas.component.css'
})
export class FormTiendasComponent implements OnInit {

  @Input('id')idTienda!:number;
  private tiendaServicio=inject(TiendasService);
  public formBuild=inject(FormBuilder);

  public formCliente:FormGroup= this.formBuild.group({
    id : [0],
    sucursal : [''],
    direccion : [''],
  }
  );

  constructor(private router:Router){
    if(localStorage.getItem('AdminID')==null){
      router.navigate([''])
    } 
  }

  ngOnInit(): void {
    if(this.idTienda!=0){
      this.tiendaServicio.obtener(this.idTienda).subscribe({
        next:(data)=>{
          console.log(data);
          this.formCliente.patchValue({
            id : data.id,
            sucursal : data.sucursal,
            direccion : data.direccion,
          })
        },error:(err)=>{
            console.log(err.message)
        }
      })
    }
  }


  isCampoVacio(objeto:Tienda){
    if(objeto.sucursal===""){
      return true;
    }
    else if(objeto.direccion===""){
      return true;
    }
    return false
  }

  guardar(){

         
          const objet:Tienda={
            id : this.idTienda,
            sucursal : this.formCliente.value.sucursal,
            direccion : this.formCliente.value.direccion
          }
          
          if(this.isCampoVacio(objet)){
            alert("Favor de llenar todos los campos")
          }
          else{
            if(this.idTienda==0){
              this.tiendaServicio.crear(objet).subscribe({
                  next:(data)=>{
                    if(data!=null){
                      this.router.navigate(["/listTiendas"]);
                    }else{
                      alert("Error Al Crear")
                    }
                  },error:(err)=>{
                      console.log(err.message)
                  }
              })
            }else{
              this.tiendaServicio.editar(objet).subscribe({
                  next:(data)=>{
                    if(data!=null){
                      this.router.navigate(["/listTiendas"]);
                    }else{
                      alert("Error Al Editar")
                    }
                  },error:(err)=>{
                      console.log(err.message)
                  }
              })
            }
          } 
      }

      volver(){
        this.router.navigate(["/listTiendas"]);
      }

}
