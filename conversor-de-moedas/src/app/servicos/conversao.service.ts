import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConversaoService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/11e6bb24c3f757dfdb38f2a8';

  async obterMoedas() {
    try {
      const response = await axios.get(`${this.apiUrl}/codes`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter moedas:', error);
      throw error;
    }
  }

  async converterMoeda(de: string, para: string, valor: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/pair/${de}/${para}/${valor}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao converter moeda:', error);
      throw error;
    }
  }
}
