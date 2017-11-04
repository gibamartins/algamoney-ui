import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { Pessoa } from './../core/model';
import { environment } from './../../environments/environment';

// Cria um contrato para os métodos chamadores só poderem passar parâmetros do tipo PessoaFiltro
export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  url: string;
  
  constructor(private http: AuthHttp) {
    this.url = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.url}`, { search: params } )
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
    return this.http.get(`${this.url}`)
      .toPromise()
      .then(response => response.json().content);
  }

  findByCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.url}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response.json();
      return lancamento;
    });
  }

  save(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.url, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  update(lancamento: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.url}/${lancamento.codigo}`, JSON.stringify(lancamento))
    .toPromise()
    .then(response => response.json());
  }

  delete(codigo: number): Promise<void> {
    return this.http.delete(`${this.url}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.url}/${codigo}/ativo`, ativo)
    .toPromise()
    .then(() => null);
  }
}
