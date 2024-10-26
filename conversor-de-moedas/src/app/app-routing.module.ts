import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ListagemMoedasComponent } from './paginas/listagem-moedas/listagem-moedas.component';
import { ConversaoMoedasComponent } from './paginas/conversao-moedas/conversao-moedas.component';
import { HistoricoConversoesComponent } from './paginas/historico-conversoes/historico-conversoes.component';

const routes: Routes = [
  { path: '', redirectTo: '/pagina-inicial', pathMatch: 'full' },
  { path: 'pagina-inicial', component: PaginaInicialComponent },
  { path: 'listagem-moedas', component: ListagemMoedasComponent },
  { path: 'conversao-moedas', component: ConversaoMoedasComponent },
  { path: 'historico-conversoes', component: HistoricoConversoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
