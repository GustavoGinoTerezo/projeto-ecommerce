import { Injectable } from '@angular/core';
import { Produtos } from '../serviceCategorias/service-categorias.service';

export interface CarrinhoDeCompra {
  imagemProduto?: string;
  nomeProduto?: string;
  quantidade?: string;
  preco?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCarrinhoDeComprasService {

  carrinhoDeCompra: CarrinhoDeCompra[] = [ ];

  adicionarAoCarrinho(produto: Produtos): void {
    const itemCarrinho: CarrinhoDeCompra = {
      imagemProduto: produto.imagem,
      nomeProduto: produto.nome,
      quantidade: '1', // Pode adicionar a lógica para gerenciar quantidades
      preco: produto.preco
    };
    this.carrinhoDeCompra.push(itemCarrinho);
  }

  getCarrinhoDeCompra(): CarrinhoDeCompra[] {
    return this.carrinhoDeCompra;
  }

  limparCarrinho(): void {
    this.carrinhoDeCompra = [];
  }

  constructor() { }
}
