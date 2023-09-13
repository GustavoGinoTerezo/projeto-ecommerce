import { FormaPagamento } from './../serviceFormaPagamento/forma-pagamento.service';
import { CarrinhoDeCompra } from './../serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Injectable } from '@angular/core';
import { EnderecoEntrega } from '../serviceUsuarioLogado/service-usuario-logado.service';

export interface Pedido {
  id?: number;
  idUsuario?: number;
  numeroPedido: number,
  status: string,
  dataPedido: string,
  enderecoSelecionado?: EnderecoEntrega[],
  formaDoPagamento?: FormaPagamento[],
  carrinhoDeCompra?: CarrinhoDeCompra[],
  valorTotal?: number;
}

export class PedidoPaginatorState {

  constructor(
    public pedido: Pedido,
    public first: number = 0,
    public rows: number = 3) {}

}

@Injectable({
  providedIn: 'root'
})
export class ServicePedidoService {

  constructor() { }

  pedidos: Pedido[] = [
    {
      numeroPedido: 0,
      idUsuario: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra:
      [
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
      ],

    },
    {
      numeroPedido: 1,
      idUsuario: 1,
      status: "Pedido solicitado",
      dataPedido: "25/11/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Boleto",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 100,
      }],

    },
    {
      numeroPedido: 2,
      idUsuario: 2,
      status: "Pedido solicitado",
      dataPedido: "25/10/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "SP",
        bairro: "SP",
        rua: "SP",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Cartão",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1000,
      }],

    },
    {
      numeroPedido: 0,
      idUsuario: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra:
      [
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
      ],

    },
    {
      numeroPedido: 1,
      idUsuario: 1,
      status: "Pedido solicitado",
      dataPedido: "25/11/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Boleto",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 100,
      }],

    },
    {
      numeroPedido: 2,
      idUsuario: 2,
      status: "Pedido solicitado",
      dataPedido: "25/10/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "SP",
        bairro: "SP",
        rua: "SP",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Cartão",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1000,
      }],

    },
    {
      numeroPedido: 0,
      idUsuario: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra:
      [
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
      ],

    },
    {
      numeroPedido: 1,
      idUsuario: 1,
      status: "Pedido solicitado",
      dataPedido: "25/11/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Boleto",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 100,
      }],

    },
    {
      numeroPedido: 2,
      idUsuario: 2,
      status: "Pedido solicitado",
      dataPedido: "25/10/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "SP",
        bairro: "SP",
        rua: "SP",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Cartão",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1000,
      }],

    },
    {
      numeroPedido: 0,
      idUsuario: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra:
      [
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
      ],

    },
    {
      numeroPedido: 1,
      idUsuario: 1,
      status: "Pedido solicitado",
      dataPedido: "25/11/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Boleto",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 100,
      }],

    },
    {
      numeroPedido: 2,
      idUsuario: 2,
      status: "Pedido solicitado",
      dataPedido: "25/10/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "SP",
        bairro: "SP",
        rua: "SP",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Cartão",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1000,
      }],

    },
    {
      numeroPedido: 0,
      idUsuario: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra:
      [
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 3,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 5,
          preco: 12401,
        },
        {
          imagemProduto: "assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg",
          nomeProduto: "teste",
          quantidade: 7,
          preco: 12401,
        },
      ],

    },
    {
      numeroPedido: 1,
      idUsuario: 1,
      status: "Pedido solicitado",
      dataPedido: "25/11/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "Teste",
        bairro: "Teste",
        rua: "Teste",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Boleto",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 100,
      }],

    },
    {
      numeroPedido: 2,
      idUsuario: 2,
      status: "Pedido em andamento",
      dataPedido: "25/10/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "SP",
        bairro: "SP",
        rua: "SP",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "Cartão",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1000,
      }],

    },
  ]

  getPedido(): Pedido[] {
    return this.pedidos;
  }



}
