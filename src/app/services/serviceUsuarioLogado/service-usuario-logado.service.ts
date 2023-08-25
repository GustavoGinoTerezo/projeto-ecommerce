import { Injectable } from '@angular/core';

export interface Usuario {
  nome?: string;
  email?: string;
  cpfOuCnpj?: number;
  telefone?: number;
  cep?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numeroResidencia?: number;
  enderecoEntrega?: EnderecoEntrega[];
}

export interface EnderecoEntrega {
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

  usuarios: Usuario[] = [
    {
      nome: 'Teste',
      email: 'teste@teste.com',
      cpfOuCnpj: 99999999999,
      telefone: 99999999999,
      cep: '99999999',
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
    return this.usuarios;
  }

  adicionarEndereco(usuarioIndex: number, novoEndereco: EnderecoEntrega): void {
    if (usuarioIndex >= 0 && usuarioIndex < this.usuarios.length) {
      const usuario = this.usuarios[usuarioIndex];
      if (usuario.enderecoEntrega) {
        usuario.enderecoEntrega.push(novoEndereco);
      } else {
        usuario.enderecoEntrega = [novoEndereco];
      }
    }
  }

}
