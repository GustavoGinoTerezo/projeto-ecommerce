import { Component } from '@angular/core';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';

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


  constructor(
    private pedidoService: ServicePedidoService,
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

    this.pedidos = this.pedidoService.getPedido();

    console.log(this.pedidos)
  }
}
