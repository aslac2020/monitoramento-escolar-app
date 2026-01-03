import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './pages/splash/splash.component';
import {MaterialModule} from "./shared/material/material.module";
import { LoginFormularioComponent } from './pages/autentificacao/login-formulario/login-formulario.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CadastroComponent } from './pages/autentificacao/cadastro/cadastro.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import {NgxMaskDirective, NgxMaskModule} from 'ngx-mask';
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import { EsqueciSenhaComponent } from './pages/autentificacao/esqueci-senha/esqueci-senha.component';
import { CodigoEmailComponent } from './pages/autentificacao/codigo-email/codigo-email.component';
import { DashboardResponsavelComponent } from './pages/dashboards/dashboard-responsavel/dashboard-responsavel.component';
import { NovaSenhaComponent } from './pages/autentificacao/nova-senha/nova-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginFormularioComponent,
    CadastroComponent,
    CabecalhoComponent,
    EsqueciSenhaComponent,
    CodigoEmailComponent,
    DashboardResponsavelComponent,
    NovaSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
