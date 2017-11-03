import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
    {
        path: 'pessoas',
        component: PessoasPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
    }, {
        path: 'pessoas/nova',
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    }, {
        path: 'pessoas/:codigo',
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    }
];
  
@NgModule({
    imports: [
        // Como aqui não é o módulo raiz, chama-se o forChild
        RouterModule.forChild(routes)
    ],
    // Este export é para dar acesso a diretiva routerLink do RouterModule
    // para que quizer utiliza-la.
    exports: [RouterModule]
})
export class PessoasRoutingModule {
    // O nome desta classe é uma convesão
}
