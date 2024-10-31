import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConversaoService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/11e6bb24c3f757dfdb38f2a8';
  
  private historicoSubject = new BehaviorSubject<any[]>(this.carregarHistorico());
  public historico$ = this.historicoSubject.asObservable();

  private moedasSubject = new BehaviorSubject<{ simbolo: string; nome: string }[]>([]);
  public moedas$ = this.moedasSubject.asObservable();

  constructor() {
    this.carregarMoedas();
  }

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
    this.atualizarHistorico(novoHistorico);
  }

  atualizarHistorico(novoHistorico: any[]) {
    this.historicoSubject.next(novoHistorico);
    if (this.estaNoNavegador()) {
      localStorage.setItem('historicoConversoes', JSON.stringify(novoHistorico));
    }
  }

  private carregarHistorico() {
    if (this.estaNoNavegador()) {
      const historicoSalvo = localStorage.getItem('historicoConversoes');
      return historicoSalvo ? JSON.parse(historicoSalvo) : [];
    }
    return [];
  }

  getHistoricoAtual() {
    return this.historicoSubject.value;
  }

  private async carregarMoedas() {
    try {
      const response = await axios.get(`${this.apiUrl}/codes`);
      const moedas = response.data.supported_codes.map(
        ([simbolo, nome]: [string, string]) => ({ simbolo, nome })
      );
      this.moedasSubject.next(moedas);
    } catch (error) {
      console.error('Erro ao obter moedas:', error);
      throw error;
    }
  }

  private estaNoNavegador(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
