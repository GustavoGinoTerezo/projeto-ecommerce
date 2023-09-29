import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { FormaPagamento, FormaPagamentoService } from 'src/app/services/serviceFormaPagamento/forma-pagamento.service';
import { ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit{

  items: MenuItem[] = [];
  carrinho: CarrinhoDeCompra[] = [];
  usuario: Usuario[] = [];
  valorTotal: number = 0;
  first: number = 0; // Primeiro item da página
  rows: number = 5; // Número de itens por página
  produtos: Produtos[] = []
  formaPagamento: FormaPagamento[] = []
  formaPagamentoSelecionada: any = null;

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private categoriasService: ServiceCategoriasService,
    private usuarioService: ServiceUsuarioLogadoService,
    private formaPagamentoService: FormaPagamentoService,
  ){}

  ngOnInit() {

    this.formaPagamentoService.getFormaPagamento().subscribe(
      (formaPagamento) => {
        this.formaPagamento = formaPagamento;
    });

    // const formaPagamento = sessionStorage.getItem('p');
    // const idFormaPagamento = formaPagamento ? parseInt(formaPagamento, 10) : -1;

    // // Depois de ativar a forma de pagamento, encontre a forma de pagamento correspondente pelo ID
    // const formaPagamentoSelecionada = this.formaPagamento.find((pagamento) => pagamento.idPagamento === idFormaPagamento);

    // // Defina a forma de pagamento selecionada para ativar o radiobutton correspondente
    // this.formaPagamentoSelecionada = formaPagamentoSelecionada;

    // const carrinhoIds = JSON.parse(sessionStorage.getItem('c') || '[]');

    setTimeout(() => {

      this.categoriasService.getProdutos().subscribe(
        (produtosAPI) => {
          this.produtos = produtosAPI;

      //     // Mapeie os produtos do carrinho com um objeto para controlar a quantidade
      //     const carrinhoMap: { [id: number]: CarrinhoDeCompra } = {};

      //     carrinhoIds.forEach((produtoId: any) => {
      //       const produtoEncontrado = this.produtos.find((produto) => produto.prodId === produtoId);
      //       if (produtoEncontrado) {
      //         // Se o produto já existe no carrinho, aumente a quantidade em vez de adicionar um novo
      //         if (carrinhoMap[produtoId]) {
      //           carrinhoMap[produtoId].quantidade!++;
      //         } else {
      //           const carrinhoItem: CarrinhoDeCompra = {
      //             prodId: produtoEncontrado.prodId,
      //             nomeProduto: produtoEncontrado.nome,
      //             preco: produtoEncontrado.preco,
      //             quantidade: 1,
      //           };
      //           carrinhoMap[produtoId] = carrinhoItem;
      //         }
      //       }
      //     });

      //     // Converta o mapa de carrinho de volta para um array
      //     this.carrinho = Object.values(carrinhoMap);
        }
      );

      // this.calcularValorTotal();
    }, 1000);

    this.usuario = this.usuarioService.getUsuario();

    this.items = [
        {
            label: 'Carrinho',
            routerLink: '/carrinho-de-compra'
        },
        {
            label: 'Pagamento',
            routerLink: '/pagamento'
        },
        {
            label: 'Confirmação',
            routerLink: '/confirmacao'
        },
        {
            label: 'Conclusão',
            routerLink: '/conclusao'
        }
    ];

  }

  calcularValorTotal(): void {
    this.valorTotal = this.carrinho.reduce((total, produto) => {
      return total + (produto.preco || 0) * (produto.quantidade || 0);
    }, 0);
  }

  calcularValorItem(item: CarrinhoDeCompra): number {
    return (item.quantidade || 0) * (item.preco || 0);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  get totalRecords(): number {
    return this.carrinho?.length || 0;
  }
}
