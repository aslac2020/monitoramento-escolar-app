import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormularioComponent } from '../login-formulario/login-formulario.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { EsqueciSenhaComponent } from '../esqueci-senha/esqueci-senha.component';
import { CodigoEmailComponent } from '../codigo-email/codigo-email.component';


const routes: Routes = [
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
  },
  {
    path: 'envio-codigo',
    component: CodigoEmailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

 }
