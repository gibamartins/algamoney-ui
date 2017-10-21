import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CategoriaService {

  url = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  findAll() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.url}`, { headers} )
    .toPromise()
    .then(response => response.json());
  }

}
