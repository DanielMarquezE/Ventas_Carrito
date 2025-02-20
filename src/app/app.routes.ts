import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { ClienteComponent } from './Pages/Formcliente/formcliente.component';
import { ListTiendasComponent } from './Pages/list-tiendas/list-tiendas.component';
import { FormTiendasComponent } from './Pages/form-tiendas/form-tiendas.component';
import { ListArticulosComponent } from './Pages/list-articulos/list-articulos.component';
import { FormArticulosComponent } from './Pages/form-articulos/form-articulos.component';
import { LoginComponent } from './Pages/login/login.component';
import { StackComponent } from './Pages/stack/stack.component';
import { ComprasComponent } from './Pages/compras/compras.component';
import { CarritoComponent } from './Pages/carrito/carrito.component';

export const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:'inicio',component:InicioComponent},
    {path:'cliente/:id',component:ClienteComponent},
    {path:'listTiendas',component:ListTiendasComponent},
    {path:'tienda/:id',component:FormTiendasComponent},
    {path:'listArticulos',component:ListArticulosComponent},
    {path:'articulo/:id',component:FormArticulosComponent},
    {path:'stack',component:StackComponent},
    {path:'compras',component:ComprasComponent},
    {path:'carrito',component:CarritoComponent}
];
