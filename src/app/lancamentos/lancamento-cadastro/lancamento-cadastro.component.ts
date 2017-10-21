import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { CategoriaService } from './../../caterias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Lancamento } from './../../core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    // Para o tipo com descrição, é necessário alterar o backend
    //{ label: 'Receita', value: {valor: 'RECEITA', descricao: 'Recebimento'} },
    { label: 'Receita', value: 'RECEITA' },
    //{ label: 'Despesa', value: {valor: 'DESPESA', descricao: 'Pagamento'} }
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    const codigoLancamento = this.router.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  getDescricaoCadastro(): string {
    return this.editando ? 'Edição de Lançamento' : 'Novo Lançamento';
  }

  getDescricaoTipo(): string {
    return this.lancamento.tipo === 'RECEITA' ? 'Recebimento' : 'Pagamento';
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.findByCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl){
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.salvaLancamento(form);
    }
  }

  private salvaLancamento(form: FormControl) {
    this.lancamentoService.save(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento cadastrado com sucesso!');
        // Limpa os dados do formulário
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarLancamento(form: FormControl) {
    this.lancamentoService.update(this.lancamento)
      .then(lancamento => {
        this.toasty.success('Lançamento atualizado com sucesso!');
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  carregarCategorias() {
    this.categoriaService.findAll()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.findAll()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }))
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
