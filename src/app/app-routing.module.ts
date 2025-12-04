import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SplashComponent} from "./pages/splash/splash.component";
import {CadastroComponent} from "./pages/cadastro/cadastro.component";
import {LoginFormularioComponent} from "./pages/login-formulario/login-formulario.component";

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'login',
    component: LoginFormularioComponent,
  },
  {
    path: 'register',
    component: CadastroComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
