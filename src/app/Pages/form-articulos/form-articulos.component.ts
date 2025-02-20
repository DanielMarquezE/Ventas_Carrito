import { Component, inject, Input, OnInit } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import{ FormBuilder,FormControl,FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms'
import { MenuComponent } from '../../components/menu/menu.component';
import { ArticulosService } from '../../Services/articulos.service';
import { Router } from '@angular/router';
import { Articulo } from '../../Models/Articulo';
import { formatDate } from '@angular/common';
import { TiendasService } from '../../Services/tiendas.service';
import { Tienda } from '../../Models/Tienda';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-form-articulos',
  standalone: true,
  imports: [MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatButtonModule,
            ReactiveFormsModule,
            MenuComponent,
            MatSelectModule,
            FormsModule,
            MatCardModule
          ],
  templateUrl: './form-articulos.component.html',
  styleUrl: './form-articulos.component.css'
})
export class FormArticulosComponent implements OnInit{

  @Input('id')idArticulo!:number;
  private articuloServicio=inject(ArticulosService);
  private tiendaServicio=inject(TiendasService);
  public listTiendas:Tienda[]=[];
  public formBulid=inject(FormBuilder);
  private date= new Date();
  private fecha:string = formatDate(this.date, 'yyyy-MM-dd', 'en');
  public seleted:number=0;
  private imageUrl:string="";
  private base64:string="Base64..."
  private valorSeleccionado=0;

  public formArticulo:FormGroup= this.formBulid.group({
    id : [0],
    codigo : [''],
    descripcion : [''],
    precio : [0],
    imagen : [''],
    stock : [0],
    sucursal : [0],
    fechacreacion : ['']
  }
  );

  constructor(private router:Router){
    if(localStorage.getItem('AdminID')==null){
      router.navigate([''])
    }  

  }

  
  capturarFile(event:any){
    console.log(event.target.files[0])
    this.imageUrl=window.URL.createObjectURL(event.target.files[0])
    console.log(this.imageUrl)
    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onloadend= ()=>{
      this.base64=reader.result as string;
      console.log(this.base64);
    }
    
  }

  

  ngOnInit(): void {
      //Validar si hay compañias registradas....
      this.tiendaServicio.list().subscribe({
        next:(data)=>{
          if(data.length>0){
            console.log(data)
            this.listTiendas=data;
            if(this.idArticulo!=0){
              this.articuloServicio.obtener(this.idArticulo).subscribe({
                next:(data)=>{
                  console.log(data);
                  this.base64=data.imagen
                  this.valorSeleccionado=data.sucursal
                  this.formArticulo.patchValue({
                    id : data.id,
                    codigo : data.codigo,
                    descripcion : data.descripcion,
                    precio : data.precio,
                    stock : data.stock,
                    fechacreacion : data.fechacreacion
                  })
                },error:(err)=>{
                    console.log(err.message)
                }
              })
            }
          }else{
            alert("No hay sucursales dadas de alta, Favor de agregar una...")
            this.router.navigate(["/listArticulos"]);
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
  }

  

  onSelected(event:any){
    this.valorSeleccionado=event.value;
  }

  isCampoVacio(objet:Articulo){
    if(objet.codigo===""){
      return true;
    }
    else if(objet.descripcion===""){
      return true;
    }
    else if(objet.precio===0){
      return true;
    }
    else if(objet.stock===0){
      return true;
    }
    else if(this.valorSeleccionado===0){
      return true;
    }
    return false;
  }

  guardar(){

        if(this.base64==="Base64..."){
          alert("Seleccione una imagen...")
          return
        }
        console.log(this.formArticulo.value.sucursal);
          const objet:Articulo={
            id : this.idArticulo,
            codigo : this.formArticulo.value.codigo,
            descripcion :this.formArticulo.value.descripcion,
            precio :this.formArticulo.value.precio,
            imagen : this.base64,
            stock : this.formArticulo.value.stock,
            sucursal :this.valorSeleccionado,
            fechacreacion : this.fecha
          }
          
          if(this.isCampoVacio(objet)){
            alert("Favor de llenar todos los campos")
          }else{
            if(this.idArticulo==0){
              this.articuloServicio.crear(objet).subscribe({
                  next:(data)=>{
                    if(data!=null){
                      this.router.navigate(["/listArticulos"]);
                    }else{
                      alert("Error Al Crear")
                    }
                  },error:(err)=>{
                      console.log(err.message)
                  }
              })
            }else{
              this.articuloServicio.editar(objet).subscribe({
                  next:(data)=>{
                    if(data!=null){
                      this.router.navigate(["/listArticulos"]);
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
        this.router.navigate(["/listArticulos"]);
      }
}

