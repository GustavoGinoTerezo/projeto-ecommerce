import { Injectable } from '@angular/core';
import { Produtos } from '../serviceCategorias/service-categorias.service';

export interface CarrinhoDeCompra {
  imagemProduto?: string;
  nomeProduto?: string;
  quantidade?: number;
  preco?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCarrinhoDeComprasService {

  carrinhoDeCompra: CarrinhoDeCompra[] = [
    
  ];

  adicionarAoCarrinho(produto: Produtos): void {
    const primeiraImagem = produto.imagem && produto.imagem[0] && produto.imagem[0].imagem;

    // Verificar se o produto já existe no carrinho
    const itemExistente = this.carrinhoDeCompra.find(item => item.nomeProduto === produto.nome);

    if (itemExistente) {
      // Se o produto já existe, aumentar a quantidade
      itemExistente.quantidade = (itemExistente.quantidade || 0) + 1;
    } else {
      // Caso contrário, adicionar um novo item ao carrinho
      const itemCarrinho: CarrinhoDeCompra = {
        imagemProduto: primeiraImagem,
        nomeProduto: produto.nome,
        quantidade: 1,
        preco: produto.preco
      };
      this.carrinhoDeCompra.push(itemCarrinho);
    }
  }

  getCarrinhoDeCompra(): CarrinhoDeCompra[] {
    return this.carrinhoDeCompra;
  }

  limparCarrinho(): void {
    this.carrinhoDeCompra = [];
  }

  constructor() { }
}
