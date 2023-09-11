import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, ServiceCategoriasService, Produtos, CategoriaVazia } from 'src/app/services/serviceCategorias/service-categorias.service';
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

  categorias: Categorias[] = [];
  categoriasFiltradas: Categorias[] = []
  categoriasSelecionada!: Categorias;
  expandedProducts: any[] = [];

  constructor(
    private categoriasService: ServiceCategoriasService,
  ){}

  ngOnInit(){

    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );

    this.categoriasService.getCategoriasTabela().then((data) => {
      this.categoriasFiltradas = data;
    });

  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase();

    if (!this.categorias) {
      this.categoriasFiltradas = [];
    } else {
      this.categoriasFiltradas = this.categorias.filter(categoria => {
        const produtosFiltrados = categoria.produtos?.filter(produto => {
          return produto.nome?.toLowerCase().includes(filterValue);
        });

        return (
          categoria.nome?.toLowerCase().includes(filterValue) ||
          (produtosFiltrados && produtosFiltrados.length > 0)
        );
      });
    }
  }

  filtrarDataEntrada(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.mapProdutos.forEach((produto) => {
      produto!.quantEntrada = produto!.quantEntrada!.filter((entrada) =>
        entrada!.dataEntrada!.toLowerCase().includes(filterValue)
      );
    });
  }

  filtrarDataSaida(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.mapProdutos.forEach((produto) => {
      produto!.quantSaida = produto!.quantSaida!.filter((saida) =>
        saida!.dataSaida!.toLowerCase().includes(filterValue)
      );
    });
  }




  categoriaVazia: CategoriaVazia = {
    nome: '',
  };

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
