import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { PessoaService } from './../pessoas/pessoa.service';
import { CategoriaService } from './../caterias/categoria.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // forRoot deve ser chamado apenas no appModule, mas
    // como ele é importado apenas no coreModule, tudo bem.
    ToastyModule.forRoot(),
    ConfirmDialogModule
    
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    // Como o Toasty e o ConfirmDialogModule são utilizados no appModule, é necessário exporta-los
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    CategoriaService,
    PessoaService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
