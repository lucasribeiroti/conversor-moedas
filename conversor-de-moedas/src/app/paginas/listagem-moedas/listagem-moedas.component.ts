import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConversaoService } from '../../servicos/conversao.service';

@Component({
  selector: 'app-listagem-moedas',
  templateUrl: './listagem-moedas.component.html',
  styleUrls: ['./listagem-moedas.component.scss']
})
export class ListagemMoedasComponent implements OnInit {
  displayedColumns: string[] = ['simbolo', 'nome'];
  dataSource = new MatTableDataSource<any>();

  constructor(private conversaoService: ConversaoService) {}

  ngOnInit() {
    this.carregarMoedas();
  }

  async carregarMoedas() {
    try {
      const dados = await this.conversaoService.obterMoedas();
      this.dataSource.data = dados.supported_codes.map(([simbolo, nome]: [string, string]) => ({ simbolo, nome }));
    } catch (error) {
      console.error('Erro ao carregar moedas:', error);
    }
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}