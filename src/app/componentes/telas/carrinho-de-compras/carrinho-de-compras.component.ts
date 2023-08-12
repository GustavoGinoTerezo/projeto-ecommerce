import { Component } from '@angular/core';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent {

  carrinho: CarrinhoDeCompra[] = [];

  constructor(private carrinhoService: ServiceCarrinhoDeComprasService) {}

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getCarrinhoDeCompra();
  }

}
