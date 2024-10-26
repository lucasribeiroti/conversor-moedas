import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConversaoService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/11e6bb24c3f757dfdb38f2a8';
  
  private historicoSubject = new BehaviorSubject<any[]>([]);
  public historico$ = this.historicoSubject.asObservable();

  async converterMoeda(de: string, para: string, valor: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/pair/${de}/${para}/${valor}`);
      const dados = response.data;

      const novaConversao = {
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        valor,
        origem: de,
        destino: para,
        taxa: dados.conversion_rate,
        resultado: dados.conversion_result
      };
      this.adicionarAoHistorico(novaConversao);

      return dados;
    } catch (error) {
      console.error('Erro ao converter moeda:', error);
      throw error;
    }
  }

  private adicionarAoHistorico(conversao: any) {
    const historicoAtual = this.historicoSubject.value;
    const novoHistorico = [...historicoAtual, conversao];
    this.historicoSubject.next(novoHistorico);
  }

  getHistoricoAtual() {
    return this.historicoSubject.value;
  }

  atualizarHistorico(novoHistorico: any[]) {
    this.historicoSubject.next(novoHistorico);
  }

  async obterMoedas() {
    try {
      const response = await axios.get(`${this.apiUrl}/codes`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter moedas:', error);
      throw error;
    }
  }
}
