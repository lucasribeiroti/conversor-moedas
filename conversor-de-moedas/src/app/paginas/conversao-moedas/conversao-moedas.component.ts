import { Component } from '@angular/core';
import { ConversaoService } from '../../servicos/conversao.service';

@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.component.html',
  styleUrls: ['./conversao-moedas.component.scss']
})
export class ConversaoMoedasComponent {
  valor: number = 1;
  moedaOrigem: string = '';
  moedaDestino: string = '';
  resultado: number | null = null;
  taxa: number | null = null;

  constructor(private conversaoService: ConversaoService) {}

  async converter() {
    try {
      const dados = await this.conversaoService.converterMoeda(this.moedaOrigem, this.moedaDestino, this.valor);
      this.resultado = dados.conversion_result;
      this.taxa = dados.conversion_rate;
    } catch (error) {
      console.error('Erro ao converter moeda:', error);
    }
  }
}
