import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
    // Quando a url for somente o / ou nada (full = combinação, poderia ter um prefix),
    // o angular redirecionará para a url lancamentos.
    {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
    {path: 'lancamentos', component: LancamentosPesquisaComponent},
    {path: 'lancamentos/novo', component: LancamentoCadastroComponent},
    {path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
    {path: 'pessoas', component: PessoasPesquisaComponent},
    {path: 'pessoas/nova', component: PessoaCadastroComponent},
    {path: 'pessoas/:codigo', component: PessoaCadastroComponent},
    {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    {path: '**', redirectTo: 'pagina-nao-encontrada'}
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    // Este export é para dar acesso a diretiva routerLink do RouterModule
    // para que quizer utiliza-la.
    exports: [RouterModule]
  })
  export class AppRoutingModule {
      // O nome desta classe é uma convesão
  }
  