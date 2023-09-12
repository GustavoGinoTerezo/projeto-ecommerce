import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, ServiceCategoriasService, Produtos, CategoriaVazia, Entrada, Saida } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';

interface City {
  name: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-gerenciamento-de-estoque',
  templateUrl: './gerenciamento-de-estoque.component.html',
  styleUrls: ['./gerenciamento-de-estoque.component.css']
})
export class GerenciamentoDeEstoqueComponent {

  @ViewChild('dt') table!: Table;
  categorias: Categorias[] = [];
  originalQuantEntrada: Entrada[] = [];
  originalQuantSaida: Saida[] = [];


  constructor(
    private categoriasService: ServiceCategoriasService,
  ){}

  ngOnInit(){

    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );

    this.originalQuantEntrada = [...this.mapProdutos[0]?.quantEntrada || []];

    this.originalQuantSaida = [...this.mapProdutos[0]?.quantSaida || []];

  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Obtém o valor do campo de pesquisa em minúsculas
    this.table.filter(filterValue, 'nome', 'contains'); // Aplica o filtro na coluna 'nome' que contém o valor
  }

  filtrarDataEntrada(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.mapProdutos.forEach((produto) => {
      if (produto && produto.quantEntrada) {
        if (filterValue === "") {
          // Se o campo de filtro estiver vazio, retorne o array original
          produto.quantEntrada = this.originalQuantEntrada;
        } else {
          produto.quantEntrada = produto.quantEntrada.filter((entrada) => {
            if (entrada && entrada.dataEntrada) {
              return entrada.dataEntrada.toLowerCase().includes(filterValue);
            }
            return false; // ou qualquer outra lógica adequada
          });
        }
      }
    });
  }


  filtrarDataSaida(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.mapProdutos.forEach((produto) => {
      if (produto && produto.quantSaida) {
        if (filterValue === "") {
          // Se o campo de filtro estiver vazio, retorne o array original
          produto.quantSaida = this.originalQuantSaida;
        } else {
          produto.quantSaida = produto.quantSaida.filter((saida) => {
            if (saida && saida.dataSaida) {
              return saida.dataSaida.toLowerCase().includes(filterValue);
            }
            return false; // ou qualquer outra lógica adequada
          });
        }
      }
    });
  }

  formatCurrency(value: number | null): string {
    if (value !== null) {
      return value.toFixed(2);
    }
    return '';
  }

  calcularTotalEntrada(produto: Produtos): number {
    if (produto?.quantEntrada) {
      return produto.quantEntrada.reduce((total, entrada) => total + (entrada.quantEntrada || 0), 0);
    }
    return 0;
  }

  // Função para calcular o total de saídas de um produto
  calcularTotalSaida(produto: Produtos): number {
    if (produto?.quantSaida) {
      return produto.quantSaida.reduce((total, saida) => total + (saida.quantSaida || 0), 0);
    }
    return 0;
  }

  // Função para calcular o saldo de um produto (entrada - saída)
  calcularSaldo(produto: Produtos): number {
    return this.calcularTotalEntrada(produto) - this.calcularTotalSaida(produto);
  }

  get mapProdutos() {
    return this.categorias.flatMap((categoria) => categoria.produtos);
  }

}
