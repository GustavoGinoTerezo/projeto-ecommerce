import { Injectable } from '@angular/core';
import { Pedido } from '../servicePedido/service-pedido.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  endereco?: string;
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

      ]
    }
  ]

  usuarioLogadoAPI: Usuario[] = []

  enderecosAPI: any[] = []

  enderecoCobrancaUsuarioLogadoAPI: any[] = []

  enderecoEntregaUsuarioLogadoAPI: any[] = []



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

  atualizarEnderecoUsuarioLogadoAPI() {
    const idUsuario = sessionStorage.getItem('u');

    if (idUsuario) {
      this.apiEnderecos.buscarEnderecos().subscribe(
        (enderecosAPI) => {
          this.enderecosAPI = enderecosAPI;

          console.log(idUsuario);
          console.log(this.enderecosAPI);

          // Filtra endereços com tpCadastro igual a "1" para o array enderecoCobrancaUsuarioLogadoAPI
          this.enderecoCobrancaUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === Number(idUsuario) && endereco.tpcadastro === "1");

          // Filtra endereços com tpCadastro igual a "2" para o array enderecoEntregaUsuarioLogadoAPI
          this.enderecoEntregaUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === Number(idUsuario) && endereco.tpcadastro === "2");

          console.log('Endereços do usuário logado (Cobrança):', this.enderecoCobrancaUsuarioLogadoAPI);
          console.log('Endereços do usuário logado (Entrega):', this.enderecoEntregaUsuarioLogadoAPI);
        },
        (error) => {
          console.log("Erro ao buscar os endereços gerais", error);
        }
      );
    }
  }


  getEnderecoCobrancaUsuarioLogado(): Observable<EnderecoEntrega[]> {
    return of (this.enderecoCobrancaUsuarioLogadoAPI);
  }

  getEnderecoEntregaUsuarioLogado(): Observable<EnderecoEntrega[]> {
    return of (this.enderecoEntregaUsuarioLogadoAPI);
  }
  // ====================================================================================== //

  atualizarTelefonesUsuarioLogadoAPI(){

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

  getTelefonesUsuarioLogado(): Observable<any[]> {
    return of (this.telefonesUsuarioLogadoAPI);
  }

  // ====================================================================================== //
  // CONTROLE DE ACESSO //

  // Método para atualizar e armazenar o valor no Local Storage
  setMostrarLateralUsuario(value: boolean): void {
    this.mostrarLateralUsuario.next(value);
    sessionStorage.setItem(this.localStorageKey, value.toString());
  }

  // Método para obter o valor como um observable
  getMostrarLateralUsuario(): Observable<boolean> {
    return this.mostrarLateralUsuario.asObservable();
  }

  // ====================================================================================== //

  setMostrarLateralAdministrador(value: boolean): void {
    this.mostrarLateralAdministrador.next(value);
    sessionStorage.setItem(this.localStorageKey, value.toString());
  }

  // Método para obter o valor como um observable
  getMostrarLateralAdministrador(): Observable<boolean> {
    return this.mostrarLateralAdministrador.asObservable();
  }


}
