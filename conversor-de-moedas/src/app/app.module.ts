import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ListagemMoedasComponent } from './paginas/listagem-moedas/listagem-moedas.component';
import { ConversaoMoedasComponent } from './paginas/conversao-moedas/conversao-moedas.component';
import { HistoricoConversoesComponent } from './paginas/historico-conversoes/historico-conversoes.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ListagemMoedasComponent,
    ConversaoMoedasComponent,
    HistoricoConversoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
