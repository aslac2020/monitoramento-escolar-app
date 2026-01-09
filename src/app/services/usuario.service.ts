import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TipoUsuarioModel} from "../models/tipoUsuario";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(param: TipoUsuarioModel){
    return this.http.post(`${environment.baseURL}/Usuario/register`, param);
  }

  public buscarUsuarioPeloEmail(email: any): Observable<any> {
    const headers = this.criarHeadersComAutorizacao();
    const url = `${environment.baseURL}/Usuario/email?email=${email}`;
    return this.http.get(url, { headers }).pipe(map((data) => data));
  }

    public buscarUsuarioPeloId(id: any): Observable<any> {
    const headers = this.criarHeadersComAutorizacao();
    const url = `${environment.baseURL}/Usuario/${id}`;
    return this.http.get(url, { headers }).pipe(map((data) => data));
  }

  private criarHeadersComAutorizacao(headers?: HttpHeaders): HttpHeaders {
    let headersHttp = headers || new HttpHeaders();
    headersHttp = headersHttp.append('Content-Type', 'application/json');
    const tokenLimpo = this.obterTokenLimpo();

    if (tokenLimpo) {
      headersHttp = headersHttp.append('Authorization', `Bearer ${tokenLimpo}`);
    } else {
      console.warn('⚠️ Token não disponível - requisição sem Authorization');
    }

    return headersHttp;
  }

    private obterTokenLimpo(): string {
    try {
      const tokenJwt = sessionStorage.getItem('token');

      if (!tokenJwt) {
        console.warn('🟡 Token não encontrado no sessionStorage');
        return '';
      }

      let tokenLimpo = tokenJwt;
      try {
        const parsed = JSON.parse(tokenJwt);
        tokenLimpo = typeof parsed === 'string' ? parsed : tokenJwt;
      } catch {
        tokenLimpo = tokenJwt;
      }

      tokenLimpo = tokenLimpo.replace(/^"(.*)"$/, '$1');
      return tokenLimpo;
    } catch (error) {
      console.error('❌ Erro ao obter token:', error);
      return '';
    }
  }
}
