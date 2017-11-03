import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  url:string = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper) {
      this.carregarToken();
    }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new Headers();
    //YW5ndWxhcjpAbmd1bEByMA== --> é o cliente e a senha: angular=@ngu@r0
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body:string = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.url, body, {headers, withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token)
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário e/ou Senha Inválido!')
          }
        }
        return Promise.reject(response);
      });
  }

  /*
  * A partir do refresh token, que está armazenado no cookie, faz-se uma chamada
  * a API, solicitando um novo token. O parâmetro withCredentials: true, que foi
  * passado no login e no obterNovo..., é necessário para que ao chamar o método
  * obterNovo..., não de erro de Cross Domain.
  * Desta forma, não é necessário mais PASSAR o usuário e a senha para se obter
  * um novo token.
  */
  obterNovoAccessTokenComRefreshToken(): Promise<void> {
    
    const headers = new Headers();
    //YW5ndWxhcjpAbmd1bEByMA== --> é o cliente e a senha: angular=@ngu@r0
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body:string = `grant_type=refresh_token`;

    return this.http.post(this.url, body, {headers, withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token)
        console.log("Token renovado com sucesso!");
        return Promise.resolve(null);
      })
      .catch(response => {
        console.log("Erro ao renovar o token", response);
        return Promise.resolve(null);
      });
  }
  
  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);

    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
