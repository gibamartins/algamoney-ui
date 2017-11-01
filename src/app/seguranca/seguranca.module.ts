import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule
    
  ],
  declarations: [LoginFormComponent]
})
export class SegurancaModule { }
