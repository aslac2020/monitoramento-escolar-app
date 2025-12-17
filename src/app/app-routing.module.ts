import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SplashComponent} from "./pages/splash/splash.component";
import {CadastroComponent} from "./pages/cadastro/cadastro.component";
import {LoginFormularioComponent} from "./pages/login-formulario/login-formulario.component";
import {EsqueciSenhaComponent} from "./pages/esqueci-senha/esqueci-senha.component";

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
  },
  {
    path: 'esqueci-senha',
    component: EsqueciSenhaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
