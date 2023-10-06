import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
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

  private inicializacaoConcluidaSubscription!: Subscription;
  private produtosSubscription!: Subscription;

  @ViewChild('dt') table!: Table;
  categorias: Categorias[] = [];
  originalQuantEntrada: Entrada[] = [];
  originalQuantSaida: Saida[] = [];
  produtosSelecionados: any[] = []
  quantidadeProdutos: number[] = []
  produtos: Produtos[] = []

  constructor(
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    private apiCategoriaService: ServiceAPICategoriaService,
    private apiProdutoService: ServiceAPIProdutoService,
  ){}

  ngOnInit(){

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarProdutos();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarProdutos();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });

    // this.originalQuantEntrada = [...this.mapProdutos[0]?.quantEntrada || []];

    // this.originalQuantSaida = [...this.mapProdutos[0]?.quantSaida || []];

  }

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }

  }

  async carregarProdutos() {

    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI;
    });

    console.log(this.produtos)
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

  onQuantidadeChange(produto: any, quantidade: number) {
    console.log('id Produto', produto.prodId)
    console.log('Nome do produto:', produto.nome);
    console.log('Quantidade:', quantidade);
  }

  onEnviarEntrada() {
    // Loop através dos produtos selecionados e suas respectivas quantidades
    for (let i = 0; i < this.produtosSelecionados.length; i++) {
      const produto = this.produtosSelecionados[i];
      const quantidade = this.quantidadeProdutos[i];
      console.log('id Produto', produto.prodId)
      console.log('Nome do produto:', produto.nome);
      console.log('Quantidade:', quantidade);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/g; // Expressão regular para permitir apenas números

    const inputChar = event.key;

    if (!inputChar.match(allowedChars)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  }
  
}
