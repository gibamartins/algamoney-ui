import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriaService {

  url = 'http://localhost:8080/categorias';

  constructor(private http: AuthHttp) { }

  findAll() {
    return this.http.get(`${this.url}`)
    .toPromise()
    .then(response => response.json());
  }

}
