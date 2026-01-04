import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitoramento-escolar-front';

  constructor(private router: Router) {
  }

  get mostrarSplash(){
    return this.router.url === '/';
  }

  get mostrarCabecalho(){
    return this.router.url !== '/' && !this.router.url.includes('/dashboard');
  }
}
