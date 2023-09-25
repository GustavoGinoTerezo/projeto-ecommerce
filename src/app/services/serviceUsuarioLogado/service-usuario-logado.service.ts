import { Injectable } from '@angular/core';
import { Pedido } from '../servicePedido/service-pedido.service';
import { BehaviorSubject, Observable } from 'rxjs';

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

// ====================================================================================== //
// CONTROLE DE ACESSO //

  private mostrarLateralUsuario = new BehaviorSubject<boolean>(false);

  private mostrarLateralAdministrador = new BehaviorSubject<boolean>(false);

  // Obtenha o nome da chave para o Local Storage
  private readonly localStorageKey = 'l';

  // Recupere o estado inicial do Local Storage, se disponível
  constructor() {
    const savedState = sessionStorage.getItem(this.localStorageKey);
    if (savedState !== null) {

      this.mostrarLateralUsuario.next(savedState === 'true');

      this.mostrarLateralAdministrador.next(savedState === 'true');
    }
  }

  // Método para atualizar e armazenar o valor no Local Storage
  public setMostrarLateralUsuario(value: boolean): void {
    this.mostrarLateralUsuario.next(value);
    sessionStorage.setItem(this.localStorageKey, value.toString());
  }

  public setMostrarLateralAdministrador(value: boolean): void {
    this.mostrarLateralAdministrador.next(value);
    sessionStorage.setItem(this.localStorageKey, value.toString());
  }

  // Método para obter o valor como um observable
  public getMostrarLateralUsuario(): Observable<boolean> {
    return this.mostrarLateralUsuario.asObservable();
  }

  // Método para obter o valor como um observable
  public getMostrarLateralAdministrador(): Observable<boolean> {
    return this.mostrarLateralAdministrador.asObservable();
  }


}
