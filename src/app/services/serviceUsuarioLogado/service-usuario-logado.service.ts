import { Injectable } from '@angular/core';

export interface Usuario {
  nome: string,
  email: string,
  cpfOuCnpj: number,
  telefone: number,
  cep: string,
  cidade: string,
  bairro: string,
  rua: string,
  numeroResidencia: number
}

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioLogadoService {

  usuario: Usuario[] = [
    {
      nome: 'Gustavo Gino Terezo',
      email: 'gustavogino@outlook.com.br',
      cpfOuCnpj: 99999999999,
      telefone: 11952491407,
      cep: '03756000',
      cidade: 'São Paulo',
      bairro: 'Jardim Gonzaga',
      rua: 'Rua Jorge Ó Solanas',
      numeroResidencia: 73
    }
  ]

  constructor() { }

  getUsuario(): Usuario[] {
    return this.usuario;
  }

}
