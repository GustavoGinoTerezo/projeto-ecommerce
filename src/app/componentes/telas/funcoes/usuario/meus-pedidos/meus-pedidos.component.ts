import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import { PedidoPaginatorState } from 'src/app/services/servicePedido/service-pedido.service';

interface EventItem {
  status?: string;
  status1?: string;
  status2?: string;
  status3?: string;
  date?: string;
  icon?: string;
  icon1?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent {

  pedidos: Pedido[] = []
  events: EventItem[];
  valorTotal: number = 0;

  callback: any[] = []

  currentPage = 0;

  first: number = 0; // Primeiro item da página
  rows: number = 5; // Número de itens por página

  firstProduct: number = 0; // Primeiro item da página
  rowsProduct: number = 3; // Número de itens por página

  paginatorStates: PedidoPaginatorState[] = [];

  constructor(
    private pedidoService: ServicePedidoService,
    private route: ActivatedRoute,
  ){

    this.events = [
      {
        status: 'Pedido recebido',
        status1: 'Pedido em separação',
        status2: 'Nota fiscal emitida',
        status3: 'pedido expedido',
        date: '15/10/2020',
        icon: 'fa-solid fa-cart-arrow-down fa-sm',
        icon1: 'fa-solid fa-check',
        color: 'rgb(30, 131, 36)',
      },
      {
        status: 'Enviado para a transportadora',
        date: '15/10/2020',
        icon: 'fa-solid fa-truck-arrow-right fa-sm',
        color: 'rgb(30, 131, 36)'
      },
      {
        status: 'Recebido pela transportadora',
        date: '15/10/2020',
        icon: 'fa-solid fa-truck-ramp-box fa-sm',
        color: 'rgb(30, 131, 36)'
      },
      {
        status: 'Mercadoria em trânsito',
        date: '16/10/2020',
        icon: 'fa-solid fa-truck-arrow-right fa-sm',
        color: 'rgb(30, 131, 36)'
      },
      {
        status: 'Mercadoria em rota de entrega',
        date: '15/10/2020',
        icon: 'fa-solid fa-person-walking-luggage fa-sm', color: 'rgb(30, 131, 36)',
        image: 'game-controller.jpg'
      },
      {
        status: 'Pedido entregue',
        date: '15/10/2020',
        icon: 'fa-solid fa-check',
        color: 'rgb(30, 131, 36)'
      },
  ];

  }


  ngOnInit(){

    this.route.params.subscribe((params) => {
      this.callback = params['callback'];

      console.log(this.callback)
    })

    this.pedidos = this.pedidoService.getPedido();

    for (const pedido of this.pedidos) {
      pedido.valorTotal = this.calcularValorTotalCarrinho(pedido);

      this.paginatorStates.push(new PedidoPaginatorState(pedido));
    }

  }

  calcularValorItem(item: CarrinhoDeCompra): number {
    return (item.quantidade || 0) * (item.preco || 0);
  }

  calcularValorTotalCarrinho(pedido: Pedido): number {
    return (pedido.carrinhoDeCompra || []).reduce((total, produto) => {
      return total + this.calcularValorItem(produto);
    }, 0);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  onPageChangeProduct(event: any, pedido: Pedido, index: number): void {
    const pageIndex = this.pedidos.indexOf(pedido);
    if (pageIndex !== -1) {
      // Atualize o estado do paginator para o pedido específico
      this.paginatorStates[pageIndex].first = event.first;
      this.paginatorStates[pageIndex].rows = event.rows;
    }
  }

  get totalRecords(): number {
    return this.pedidos?.length || 0;
  }

}
