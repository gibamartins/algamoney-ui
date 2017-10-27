import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

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

  novo(form: FormControl) {
    // É necessário limpar os dados do formulário, por que o
    // router.navigate não limpará os dados caso o usuário esteja na
    // mesma url.
    // Ex.: Quando o usuário está na criação de lançamentos, preenche alguns dados
    //      e clica no botão novo, ele NÃO está mudando a URL, então, o angular
    //      NÃO considerará uma nova URL.
    form.reset();

    // Work around (para resolver o problema de limpar o formulário e perder os dados do new Lancamento)
    // Para que o formulário não fique com o checkbox receita/despesa em branco,
    // após o reset, é necessário fazer o seguinte:
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    // O bind(this), informa ao javascript que o this é do escopo da classe LancamentoCadastroComponent
    // e não do método setTimeout.

    // Vamos redirecionar para a tela de criação de lançamento.
    this.router.navigate(['/lancamentos/novo']);
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
      .then(lancamentoSalvo => {
        this.toasty.success('Lançamento cadastrado com sucesso!');
        // Limpa os dados do formulário
        //form.reset();
        //this.lancamento = new Lancamento();
        // Vamos redirecionar para a tela de edição do lançamento salvo.
        this.router.navigate(['/lancamentos', lancamentoSalvo.codigo]);
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
