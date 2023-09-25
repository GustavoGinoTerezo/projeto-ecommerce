import { Injectable } from '@angular/core';
import { Pedido } from '../servicePedido/service-pedido.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceApiUsuarioLogadoService } from '../servicesAPI/serviceAPI-UsuarioLogado/service-api-usuario-logado.service';
import { ServiceApiEnderecosService } from '../servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';
import { ServiceApiTelefonesService } from '../servicesAPI/serviceAPI-Telefones/service-api-telefones.service';

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

export interface Telefone {
  contId?: number;
  LoginId?: number;
  telefone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioLogadoService {

  private mostrarLateralUsuario = new BehaviorSubject<boolean>(false);
  private mostrarLateralAdministrador = new BehaviorSubject<boolean>(false);
  // Obtenha o nome da chave para o Local Storage
  private readonly localStorageKey = 'l';

  constructor(
    private apiEnderecos: ServiceApiEnderecosService,
    private apiTelefones: ServiceApiTelefonesService,

  ) {
    // Recupere o estado inicial do Local Storage, se disponível
    const savedState = sessionStorage.getItem(this.localStorageKey);
    if (savedState !== null) {
      this.mostrarLateralUsuario.next(savedState === 'true');
      this.mostrarLateralAdministrador.next(savedState === 'true');
    }
  }

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

  usuarioLogadoAPI: Usuario[] = []

  enderecosAPI: EnderecoEntrega[] = []

  enderecoUsuarioLogadoAPI: EnderecoEntrega[] = []

  telefonesAPI: Telefone[] = []

  telefonesUsuarioLogadoAPI: Telefone[] = []

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

  atualizarEnderecoUsuarioLogadoAPI(){

    const idUsuario = sessionStorage.getItem('u')

    if(idUsuario){
      this.apiEnderecos.buscarEnderecos().subscribe(
        (enderecosAPI) => {
          this.enderecosAPI = enderecosAPI;

          console.log(idUsuario)
          console.log(this.enderecosAPI)

          this.enderecoUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === Number(idUsuario))

          console.log('Endereços do usuário logado:', this.enderecoUsuarioLogadoAPI);
        },
        (error) => {
          console.log("Erro ao buscar os endereços gerais", error)
        }
      )
    }
  }

  // ====================================================================================== //

  atualizarTelefoneUsuarioLogadoAPI(){

    const idUsuario = sessionStorage.getItem('u')

    if(idUsuario){
      this.apiTelefones.buscarTelefones().subscribe(
        (telefonesAPI) => {
          this.telefonesAPI = telefonesAPI;

          console.log(this.telefonesAPI)

          this.telefonesUsuarioLogadoAPI = telefonesAPI.filter((telefone) => telefone.LoginId === Number(idUsuario))

          console.log('Telefones do usuário logado:', this.telefonesUsuarioLogadoAPI);
      },
      (error) => {
        console.log("Erro ao buscar os endereços gerais", error)
      }
      )
    }
  }

  // ====================================================================================== //
  // CONTROLE DE ACESSO //

  // Método para atualizar e armazenar o valor no Local Storage
  setMostrarLateralUsuario(value: boolean): void {
    this.mostrarLateralUsuario.next(value);
    sessionStorage.setItem(this.localStorageKey, value.toString());
  }

  setMostrarLateralAdministrador(value: boolean): void {
    this.mostrarLateralAdministrador.next(value);
    sessionStorage.setItem(this.localStorageKey, value.toString());
  }

  // Método para obter o valor como um observable
  getMostrarLateralUsuario(): Observable<boolean> {
    return this.mostrarLateralUsuario.asObservable();
  }

  // Método para obter o valor como um observable
  getMostrarLateralAdministrador(): Observable<boolean> {
    return this.mostrarLateralAdministrador.asObservable();
  }


}
