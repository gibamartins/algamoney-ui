import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  getDescricaoCadastro(): string {
    return this.editando ? 'Edição de Pessoa' : 'Nova Pessoa';
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    // Vamos redirecionar para a tela de criação de pessoa.
    this.router.navigate(['/pessoas/nova']);
  }    

  carregarPessoa(codigo: number) {
    this.pessoaService.findByCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl){
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.salvaPessoa(form);
    }
  }

  private salvaPessoa(form: FormControl) {
    this.pessoaService.save(this.pessoa)
      .then(pessoaSalva => {
        this.toasty.success('Pessoa cadastrada com sucesso!');

        this.router.navigate(['/pessoas', pessoaSalva.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarPessoa(form: FormControl) {
    this.pessoaService.update(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa atualizada com sucesso!');
        this.pessoa = pessoa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
}
