import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginParam, SolicitarParam} from "../models/login";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http: HttpClient) { }

  login(param: LoginParam)  {
    return this.http.post(`${environment.baseURL}/AutenticaoUsuario/login`, param);
  }

  solicitarNovaSenha(param: SolicitarParam)  {
    return this.http.post(`${environment.baseURL}/AutenticaoUsuario/solicitar`, param);
  }
}
