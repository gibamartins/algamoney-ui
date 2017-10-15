import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';


// Cria um contrato para os métodos chamadores só poderem passar parâmetros do tipo PessoaFiltro
export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  url = 'http://localhost:8080/pessoas';
  
  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.url}`, { headers: headers, search: params } )
      .toPromise()
      .then(response => {
        const retorno = response.json()
        const dados = {
          pessoas: retorno.content,
          total: retorno.totalElements
        }
        return dados;
    });
  }

  findAll() {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.url}`, { headers} )
    .toPromise()
    .then(response => response.json().content);
  }

  delete(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.url}/${codigo}x`, { headers} )
    .toPromise()
    .then(() => null);
  }
}
