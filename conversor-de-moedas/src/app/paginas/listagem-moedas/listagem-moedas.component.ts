import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConversaoService } from '../../servicos/conversao.service';

@Component({
  selector: 'app-listagem-moedas',
  templateUrl: './listagem-moedas.component.html',
  styleUrls: ['./listagem-moedas.component.scss']
})
export class ListagemMoedasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['simbolo', 'nome'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private conversaoService: ConversaoService) {}

  ngOnInit() {
    this.conversaoService.moedas$.subscribe(moedas => {
      this.dataSource.data = moedas;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
