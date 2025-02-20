import { Component, inject, Input, input, OnInit } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import{ FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms'
import { ClienteService } from '../../Services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../Models/Cliente';
import { MenuComponent } from '../../components/menu/menu.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MenuComponent,MatCardModule],
  templateUrl: './Formcliente.component.html',
  styleUrl: './Formcliente.component.css'
})
export class ClienteComponent implements OnInit{

  @Input('id')idCliente!:number;
  private clienteServicio=inject(ClienteService);
  public formBuild= inject(FormBuilder);

  public formCliente:FormGroup= this.formBuild.group({
    id : [0],
    nombres : [''],
    apellidos : [''],
    direccion : [''],
    userName : [''],
    password : ['']
  }
  );

  constructor(private router:Router){
    if(localStorage.getItem('AdminID')==null){
      router.navigate([''])
    } 
  }

    ngOnInit(): void {
      if(this.idCliente!=0){
        this.clienteServicio.obtener(this.idCliente).subscribe({
          next:(data)=>{
            console.log(data);
            this.formCliente.patchValue({
              id : data.id,
              nombres : data.nombres,
              apellidos : data.apellidos,
              direccion : data.direccion,
              userName : data.userName,
              password : data.password
            })
          },error:(err)=>{
              console.log(err.message)
          }
        })
      }
    }


    isCampoVacio(objeto:Cliente){
      if(objeto.nombres===""){
        return true;
      }
      else if(objeto.direccion===""){
        return true;
      }
      else if(objeto.userName===""){
        return true;
      }
      else if(objeto.password===""){
        return true;
      }
      return false;
    }

    guardar(){
        const objet:Cliente={
          id : this.idCliente,
          nombres : this.formCliente.value.nombres,
          apellidos :this.formCliente.value.apellidos,
          direccion : this.formCliente.value.direccion,
          userName : this.formCliente.value.userName,
          password :this.formCliente.value.password
        }
        if(this.isCampoVacio(objet)){
          alert("Favor de llenar todos los campos")
        }else{
          if(this.idCliente==0){
            this.clienteServicio.crear(objet).subscribe({
                next:(data)=>{
                  if(data!=null){
                    this.router.navigate(["/inicio"]);
                  }else{
                    alert("Error Al Crear")
                  }
                },error:(err)=>{
                    console.log(err.message)
                }
            })
          }else{
            this.clienteServicio.editar(objet).subscribe({
                next:(data)=>{
                  if(data!=null){
                    this.router.navigate(["/inicio"]);
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
      this.router.navigate(["/inicio"]);
    }

}
