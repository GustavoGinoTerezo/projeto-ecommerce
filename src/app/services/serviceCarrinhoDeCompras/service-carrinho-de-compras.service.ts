import { Injectable } from '@angular/core';
import { Produtos } from '../serviceCategorias/service-categorias.service';

export interface CarrinhoDeCompra {
  prodId?: number;
  imagemProduto?: string;
  nomeProduto?: string;
  quantidade?: number;
  altura?: number;
  largura?: number;
  comprimento?: number;
  peso?: number;
  preco?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCarrinhoDeComprasService {

  constructor() { }

  carrinhoDeCompra: any[] = [];

  getCarrinhoDeCompra(): CarrinhoDeCompra[] {
    return this.carrinhoDeCompra;
  }

  limparCarrinho(): void {
    this.carrinhoDeCompra = [];
  }




}
