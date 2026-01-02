import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoGlobalService {

  private memoryStorage = new Object();

  constructor() { }


  obter(chave: string, metodo: string): any {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        return JSON.parse(<string>window.localStorage.getItem(chave));
      case 'SESSIONSTORAGE':
        return JSON.parse(<string>window.sessionStorage.getItem(chave));
      case 'MEMORYSTORAGE':
      default:
        // @ts-ignore
        return this.memoryStorage[chave];
    }
  }

  armazenar(chave: string, valor: any, metodo: string) {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        window.localStorage.setItem(chave, JSON.stringify(valor));
        break;
      case 'SESSIONSTORAGE':
        window.sessionStorage.setItem(chave, JSON.stringify(valor));
        break;
      case 'MEMORYSTORAGE':
      default:
        // @ts-ignore
        this.memoryStorage[chave] = valor;
        break;
    }
  }

  remover(chave: string, metodo: string) {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        window.localStorage.removeItem(chave);
        break;
      case 'SESSIONSTORAGE':
        window.sessionStorage.removeItem(chave);
        break;
      case 'MEMORYSTORAGE':
      default:
        break;
    }
  }

  existe(chave: string, metodo: string): boolean {
    switch (metodo.toUpperCase()) {
      case 'LOCALSTORAGE':
        if (window.localStorage.getItem(chave)) {
          return true;
        }
        break;
      case 'SESSIONSTORAGE':
        if (window.sessionStorage.getItem(chave)) {
          return true;
        }
        break;
      case 'MEMORYSTORAGE':
        // @ts-ignore
        if (this.memoryStorage[chave]) {
          return true;
        }
        break;
    }
    return false;
  }
}
