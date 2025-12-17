import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TipoUsuarioModel} from "../models/tipoUsuario";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(param: TipoUsuarioModel){
    return this.http.post(`${environment.baseURL}/Usuario/register`, param);
  }
}
