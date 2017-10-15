import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaFiltro, PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  totalDeRegistros = 0;
  filtro = new PessoaFiltro();

  // Associa a variável tabela à variável #tabela na dataTable
  @ViewChild('tabela')
  grid;

  /*
  //Testando o método findAll
  todasAsPessoas: SelectItem[];
  pessoaSelecionada: string;
  */
  constructor(
    private pessoaService: PessoaService,
    private errorHandle: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService) {}

  ngOnInit() {
    /*
    this.pessoaService.findAll()
      .then(pessoas => {
        console.log(pessoas);
        this.todasAsPessoas = [];
        pessoas.forEach( pessoa => {
          this.todasAsPessoas.push({label:`${pessoa.nome}`, value:pessoa.id});
        });
        //this.todasAsPessoas = pessoas
      });
    */
  }

  // o parâmetro pagina é por default = 0
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    
    this.pessoaService.pesquisar(this.filtro)
    .then(dados => {
      this.pessoas = dados.pessoas;
      this.totalDeRegistros = dados.total
    })
    .catch(error => this.errorHandle.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir ${pessoa.nome}?`,
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.delete(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success(`${pessoa.nome} excluída com sucesso!`);
      })
      .catch(error => this.errorHandle.handle(error));
  }
}
