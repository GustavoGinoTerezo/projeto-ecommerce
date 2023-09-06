import { Injectable } from '@angular/core';
import { Pedido } from '../servicePedido/service-pedido.service';

export interface Usuario {
  id?: number;
  nome?: string;
  email?: string;
  cpfOuCnpj?: number;
  telefone?: number;
  cep?: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numeroResidencia?: number;
  enderecoEntrega?: EnderecoEntrega[];
  pedidos?: Pedido[];
}

export interface EnderecoEntrega {
  id?: number;
  identificacao?: string;
  cep: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numeroResidencia?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioLogadoService {

  usuarioLogado: Usuario[] = [
    {
      nome: 'Teste',
      email: 'teste@teste.com',
      cpfOuCnpj: 99999999999,
      telefone: 99999999999,
      cep: 99999999,
      cidade: 'Teste',
      bairro: 'Teste',
      rua: 'Teste',
      numeroResidencia: 99,
      enderecoEntrega:
      [
        {
          identificacao: "Principal",
          cep: 9999999,
          cidade: "ABC",
          bairro: "Teste",
          rua: "Teste",
          numeroResidencia: 99
        },
        {
          identificacao: "Secundário 1",
          cep: 9999999,
          cidade: "Teste",
          bairro: "Teste",
          rua: "Teste",
          numeroResidencia: 99
        },


      ]
    }
  ]

  constructor() { }

  getUsuario(): Usuario[] {
    return this.usuarioLogado;
  }

  adicionarEndereco(usuarioIndex: number, novoEndereco: EnderecoEntrega): void {
    if (usuarioIndex >= 0 && usuarioIndex < this.usuarioLogado.length) {
      const usuario = this.usuarioLogado[usuarioIndex];
      if (usuario.enderecoEntrega) {
        usuario.enderecoEntrega.push(novoEndereco);
      } else {
        usuario.enderecoEntrega = [novoEndereco];
      }
    }
  }

}
