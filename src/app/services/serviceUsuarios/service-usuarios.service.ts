import { Injectable } from '@angular/core';
import { Usuario } from '../serviceUsuarioLogado/service-usuario-logado.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuariosService {

  usuarios: Usuario[] = [
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
    },
    {
      nome: 'Teste2',
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
    },
    {
      nome: 'Teste3',
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
          cep: 998,
          cidade: "Teste",
          bairro: "Teste",
          rua: "Teste",
          numeroResidencia: 99
        },
      ]
    },
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
    },
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
    },
  ]

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getUsuarioTabela() {
    return Promise.resolve(this.usuarios);
  }

}