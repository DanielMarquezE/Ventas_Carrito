import { Component, inject } from '@angular/core';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import{ FormBuilder,FormControl,FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { ClienteService } from '../../Services/cliente.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MainHeaderComponent,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,MatCardModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private clienteServicio=inject(ClienteService);
  public formBuild= inject(FormBuilder);

  public formUser:FormGroup= this.formBuild.group({
      id : [0],
      userName : [''],
      password : [''],
      isAdmin : [''],
      idCliente: [0]
  }
  );

  constructor(private router:Router){}

  enviar(){
    const objet:User={
      id : this.formUser.value.id,
      userName : this.formUser.value.userName,
      password : this.formUser.value.password,
      isAdmin : this.formUser.value.isAdmin,
      idCliente: this.formUser.value.idCliente
    }

    this.clienteServicio.validateUser(objet).subscribe({
      next:(data)=>{

        if(data.id!=0){
          if(data.isAdmin=="1"){
            localStorage.setItem('AdminID',data.isAdmin)
            this.router.navigate(["/inicio"]);
          }else{
            localStorage.setItem('CliendId',data.idCliente.toString())
            this.router.navigate(["/stack"]);
          }
        }else{
          alert("Usuario o Password incorrecti intente de nuevo")
        }
      },error:(err)=>{
        console.log(err.message)
      }
    })



  }

}
