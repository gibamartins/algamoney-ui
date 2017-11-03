import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];
  totalDeRegistros = 0;
  filtro = new LancamentoFiltro();

  // Associa a variável tabela à variável #tabela na dataTable
  @ViewChild('tabela')
  grid;

  constructor(
    private lancamentoService: LancamentoService,
    private auth: AuthService,
    private errorHandle: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService) {}

  ngOnInit() {
  }

  // o parâmetro pagina é por default = 0
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    
    this.lancamentoService.pesquisar(this.filtro)
    .then(dados => {
      this.lancamentos = dados.lancamentos;
      this.totalDeRegistros = dados.total
    })
    .catch(error => this.errorHandle.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o lançamento?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.delete(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(error => this.errorHandle.handle(error));
  }
}
