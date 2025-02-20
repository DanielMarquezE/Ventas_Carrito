import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent {

  constructor(private router:Router){}

  salir(){
    localStorage.clear();
    this.router.navigate([''])
  }

}
