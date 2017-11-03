import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
    {
        path: 'lancamentos',
        component: LancamentosPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']
    }
    }, {
        path: 'lancamentos/novo',
        component: LancamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    }, {
        path: 'lancamentos/:codigo',
        component: LancamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
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
export class LacamentosRoutingModule {
    // O nome desta classe é uma convesão
}
