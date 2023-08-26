import { FormaPagamento } from './../serviceFormaPagamento/forma-pagamento.service';
import { CarrinhoDeCompra } from './../serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Injectable } from '@angular/core';
import { EnderecoEntrega } from '../serviceUsuarioLogado/service-usuario-logado.service';

export interface Pedido {
  numeroPedido: number,
  status: string,
  dataPedido: string,
  enderecoSelecionado?: EnderecoEntrega[],
  formaDoPagamento?: FormaPagamento[],
  carrinhoDeCompra?: CarrinhoDeCompra[],
}

@Injectable({
  providedIn: 'root'
})
export class ServicePedidoService {

  constructor() { }

  pedidos: Pedido[] = [
    {
      numeroPedido: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "São Paulo",
        bairro: "Jardim Gonzaga",
        rua: "Rua Jorge Ó Solanas",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1,
      }]
    },
    {
      numeroPedido: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "São Paulo",
        bairro: "Jardim Gonzaga",
        rua: "Rua Jorge Ó Solanas",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1,
      }]
    },
    {
      numeroPedido: 0,
      status: "Pedido solicitado",
      dataPedido: "25/08/2023",
      enderecoSelecionado: [{
        cep: 13500000,
        cidade: "SP",
        bairro: "SP",
        rua: "SP",
        numeroResidencia: 99,
      }],
      formaDoPagamento: [{
        tipoPagamento: "PIX",
      }],
      carrinhoDeCompra: [{
        imagemProduto: "teste",
        nomeProduto: "teste",
        quantidade: 1,
        preco: 1,
      }]
    },
  ]

  getPedido(): Pedido[] {
    return this.pedidos;
  }

}
