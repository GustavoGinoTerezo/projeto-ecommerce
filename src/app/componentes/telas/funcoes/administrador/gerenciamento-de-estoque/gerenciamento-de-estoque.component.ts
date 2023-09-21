import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, ServiceCategoriasService, Produtos, CategoriaVazia, Entrada, Saida } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';
import { ServiceAPICategoriaService } from 'src/app/services/servicesAPI/serviceAPI-Categoria/service-api-categoria.service';
import { ServiceAPIProdutoService } from 'src/app/services/servicesAPI/serviceAPI-Produto/service-api-produto.service';

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

  produtos: Produtos[] = []

  constructor(
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    private apiCategoriaService: ServiceAPICategoriaService,
    private apiProdutoService: ServiceAPIProdutoService,
  ){}

  ngOnInit(){

    setTimeout(() => {

      this.categoriasService.getCategorias().subscribe(
        (categoriasAPI) => {
          this.categorias = categoriasAPI;
        }
      );

      this.categoriasService.getProdutos().subscribe(
        (produtosAPI) => {
          this.produtos = produtosAPI;
        }
      );

      console.log(this.produtos)

    }, 1000);

    // this.originalQuantEntrada = [...this.mapProdutos[0]?.quantEntrada || []];

    // this.originalQuantSaida = [...this.mapProdutos[0]?.quantSaida || []];

  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Obtém o valor do campo de pesquisa em minúsculas
    this.table.filter(filterValue, 'nome', 'contains'); // Aplica o filtro na coluna 'nome' que contém o valor
  }

  // filtrarDataEntrada(event: any) {
  //   const filterValue = event.target.value.toLowerCase();
  //   this.mapProdutos.forEach((produto) => {
  //     if (produto && produto.quantEntrada) {
  //       if (filterValue === "") {
  //         // Se o campo de filtro estiver vazio, retorne o array original
  //         produto.quantEntrada = this.originalQuantEntrada;
  //       } else {
  //         produto.quantEntrada = produto.quantEntrada.filter((entrada) => {
  //           if (entrada && entrada.dataEntrada) {
  //             return entrada.dataEntrada.toLowerCase().includes(filterValue);
  //           }
  //           return false; // ou qualquer outra lógica adequada
  //         });
  //       }
  //     }
  //   });
  // }


  // filtrarDataSaida(event: any) {
  //   const filterValue = event.target.value.toLowerCase();
  //   this.mapProdutos.forEach((produto) => {
  //     if (produto && produto.quantSaida) {
  //       if (filterValue === "") {
  //         // Se o campo de filtro estiver vazio, retorne o array original
  //         produto.quantSaida = this.originalQuantSaida;
  //       } else {
  //         produto.quantSaida = produto.quantSaida.filter((saida) => {
  //           if (saida && saida.dataSaida) {
  //             return saida.dataSaida.toLowerCase().includes(filterValue);
  //           }
  //           return false; // ou qualquer outra lógica adequada
  //         });
  //       }
  //     }
  //   });
  // }

  formatCurrency(value: number | null): string {
    if (value !== null) {
      return value.toFixed(2);
    }
    return '';
  }

  calcularSaldo(produto: Produtos): number {
    const entrada = typeof produto.qtdEntrada === 'number' ? produto.qtdEntrada : 0;
    const saida = typeof produto.qtdSaida === 'number' ? produto.qtdSaida : 0;
    return entrada - saida;
  }




}
