import { Component } from '@angular/core';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent {

  pedidos: Pedido[] = []

  constructor(
    private pedidoService: ServicePedidoService,
  ){}


  ngOnInit(){

    this.pedidos = this.pedidoService.getPedido();

    console.log(this.pedidos)
  }
}
