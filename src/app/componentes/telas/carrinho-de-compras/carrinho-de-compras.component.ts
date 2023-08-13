import { Component } from '@angular/core';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent {


  carrinho: CarrinhoDeCompra[] = [];
  first: number = 0; // Primeiro item da página
  rows: number = 10; // Número de itens por página

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    ) {}

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getCarrinhoDeCompra();
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  get totalRecords(): number {
    return this.carrinho?.length || 0;
  }

}
