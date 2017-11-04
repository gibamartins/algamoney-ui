import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { ErrorHandlerService } from './../core/error-handler.service';

import { environment } from './../../environments/environment';

/*
* Classe criada somente para receber por injeção a classe AuthHttp. Pois esta classe
* envia o cookie válido para a API poder remover o token e zerar o cookie.
*/
@Injectable()
export class LogoutService {

  url: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
    // Observar a importação do environment certo, pois
    // pode ocorre de importar o arquivo de produção:
    // environment.prod
    this.url = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.url, { withCredentials: true})
    .toPromise()
    .then(() => {
      this.auth.limparAccessToken();
    });
  }
}
