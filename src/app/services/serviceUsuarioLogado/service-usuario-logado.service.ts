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
      nome: 'Teste',
      email: 'teste@teste.com',
      cpfOuCnpj: 99999999999,
      telefone: 99999999999,
      cep: '99999999',
      cidade: 'Teste',
      bairro: 'Teste',
      rua: 'Teste',
      numeroResidencia: 99,
    }
  ]

  constructor() { }

  getUsuario(): Usuario[] {
    return this.usuario;
  }

}
