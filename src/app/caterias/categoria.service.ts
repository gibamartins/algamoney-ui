import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';

@Injectable()
export class CategoriaService {

  url: string;

  constructor(private http: AuthHttp) {
    this.url = `${environment.apiUrl}/categorias`;
  }

  findAll() {
    return this.http.get(`${this.url}`)
    .toPromise()
    .then(response => response.json());
  }

}
