import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
    {path: 'login', component: LoginFormComponent}
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
export class SegurancaRoutingModule {
    // O nome desta classe é uma convesão
}
