import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConversaoService } from '../../servicos/conversao.service';

@Component({
  selector: 'app-historico-conversoes',
  templateUrl: './historico-conversoes.component.html',
  styleUrls: ['./historico-conversoes.component.scss']
})
export class HistoricoConversoesComponent implements OnInit {
  displayedColumns: string[] = ['data', 'hora', 'valor', 'origem', 'destino', 'taxa', 'resultado', 'acoes'];
  dataSource = new MatTableDataSource<any>();

  constructor(private conversaoService: ConversaoService) {}

  ngOnInit(): void {
    this.conversaoService.historico$.subscribe(historico => {
      this.dataSource.data = historico;
    });
  }

  excluirConversao(index: number) {
    const historicoAtual = this.conversaoService.getHistoricoAtual();
    historicoAtual.splice(index, 1);
    this.conversaoService.atualizarHistorico(historicoAtual);
  }
}
