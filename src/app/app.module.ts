import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './pages/splash/splash.component';
import {MaterialModule} from "./shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import {NgxMaskModule} from 'ngx-mask';
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    CabecalhoComponent
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
