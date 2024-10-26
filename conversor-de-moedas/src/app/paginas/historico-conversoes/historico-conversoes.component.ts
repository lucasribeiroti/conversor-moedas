import { Component } from '@angular/core';

@Component({
  selector: 'app-historico-conversoes',
  templateUrl: './historico-conversoes.component.html',
  styleUrls: ['./historico-conversoes.component.scss']
})
export class HistoricoConversoesComponent {
  historico = [
    { data: '2024-10-24', hora: '15:30', valor: 100, origem: 'USD', destino: 'BRL', taxa: 5.27, resultado: 527 }
  ];

  excluirConversao(index: number) {
    this.historico.splice(index, 1);
  }
}