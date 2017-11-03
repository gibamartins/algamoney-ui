import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { Lancamento } from './../core/model';

// Cria um contrato para os métodos chamadores só poderem passar parâmetros do tipo LancamentoFiltro
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  url = 'http://localhost:8080/lancamentos';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-DD-MM'));
    }
    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-DD-MM'));
    }

    return this.http.get(`${this.url}?resumo`, { headers: headers, search: params } )
      .toPromise()
      .then(response => {
        const retorno = response.json()
        const dados = {
          lancamentos: retorno.content,
          total: retorno.totalElements
        }
        return dados;
      });
  }

  findByCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.url}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response.json();
      // Converte as datas do lançamento
      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  save(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.url, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  update(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.url}/${lancamento.codigo}`, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  delete(codigo: number): Promise<void> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
