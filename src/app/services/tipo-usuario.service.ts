import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TipoUsuarioModel} from "../models/tipoUsuario";

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor(private http: HttpClient) { }

  buscarTiposUsuarios(): Observable<TipoUsuarioModel>{
    return this.http.get<TipoUsuarioModel>(`${environment.baseURL}/TipoUsuario/listar`)
  }
}
