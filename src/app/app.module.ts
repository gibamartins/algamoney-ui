import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importa todos os componentes do primeng, inclusive os que não estão sendo utilizados
// import { InputTextModule } from 'primeng/primeng';
// Importa somente o componente inputtext
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
