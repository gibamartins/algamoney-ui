import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

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

  constructor(private http: Http) { }

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

  delete(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.url}/${codigo}`, { headers} )
    .toPromise()
    .then(() => null);
  }
}
