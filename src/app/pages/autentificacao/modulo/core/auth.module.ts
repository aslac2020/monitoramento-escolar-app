import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../../routing/auth-routing.module';
import { LoginFormularioComponent } from '../../login-formulario/login-formulario.component';
import { CadastroComponent } from '../../cadastro/cadastro.component';
import { EsqueciSenhaComponent } from '../../esqueci-senha/esqueci-senha.component';
import { CodigoEmailComponent } from '../../codigo-email/codigo-email.component';
import { NovaSenhaComponent } from '../../nova-senha/nova-senha.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoginFormularioComponent,
    CadastroComponent,
    EsqueciSenhaComponent,
    CodigoEmailComponent,
    NovaSenhaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxMaskModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
