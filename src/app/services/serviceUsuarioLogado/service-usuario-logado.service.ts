import { Injectable } from '@angular/core';
import { Pedido } from '../servicePedido/service-pedido.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ServiceApiUsuarioLogadoService } from '../servicesAPI/serviceAPI-UsuarioLogado/service-api-usuario-logado.service';
import { ServiceApiEnderecosService } from '../servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';
import { ServiceApiTelefonesService } from '../servicesAPI/serviceAPI-Telefones/service-api-telefones.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

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
  UfId?: number;
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
  private readonly localStorageKeyUser = 'lu';
  private readonly localStorageKeyAdmin = 'la';

  constructor(
    private apiEnderecos: ServiceApiEnderecosService,
    private apiTelefones: ServiceApiTelefonesService,

  ) {

    const encryptedValueFromStorageUsuario = sessionStorage.getItem(this.localStorageKeyUser);
    if (encryptedValueFromStorageUsuario) {
      const secretKeyLateral = 'valorLateral';
      const decryptedValue = AES.decrypt(encryptedValueFromStorageUsuario, secretKeyLateral);
      if (decryptedValue.sigBytes > 0) {
        const decryptedBooleanValue = decryptedValue.toString(CryptoJS.enc.Utf8) === 'true';
        this.mostrarLateralUsuario.next(decryptedBooleanValue);
      }
    }

    const encryptedValueFromStorageAdmin = sessionStorage.getItem(this.localStorageKeyAdmin);
    if (encryptedValueFromStorageAdmin) {
      const secretKeyLateral = 'valorLateral';
      const decryptedValue = AES.decrypt(encryptedValueFromStorageAdmin, secretKeyLateral);
      if (decryptedValue.sigBytes > 0) {
        const decryptedBooleanValue = decryptedValue.toString(CryptoJS.enc.Utf8) === 'true';
        this.mostrarLateralAdministrador.next(decryptedBooleanValue);
        console.log('Valor booleano descriptografado (Administrador):', decryptedBooleanValue);
      }
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
    // Chave secreta usada para criptografia (a mesma chave que você usou para criptografar)
    const secretKeyidUsuario = 'idUsuario';

    // Valor criptografado recuperado do sessionStorage
    const encryptedIdUsuario = sessionStorage.getItem('u');

    // Verifique se o valor criptografado existe e, em seguida, faça a descriptografia
    if (encryptedIdUsuario) {
      const decryptedIdUsuario = AES.decrypt(encryptedIdUsuario, secretKeyidUsuario);

      // Verifique se a descriptografia foi bem-sucedida
      if (decryptedIdUsuario.sigBytes > 0) {
        const idUsuario = parseInt(decryptedIdUsuario.toString(CryptoJS.enc.Utf8), 10); // Converta para número

        // Verifique se idUsuario não é um NaN (valor inválido)
        if (!isNaN(idUsuario)) {
          this.apiEnderecos.buscarEnderecos().subscribe(
            (enderecosAPI) => {
              this.enderecosAPI = enderecosAPI;

              // Filtra endereços com tpCadastro igual a "1" para o array enderecoCobrancaUsuarioLogadoAPI
              this.enderecoCobrancaUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === idUsuario && endereco.tpcadastro === "1");

              // Filtra endereços com tpCadastro igual a "2" para o array enderecoEntregaUsuarioLogadoAPI
              this.enderecoEntregaUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === idUsuario && endereco.tpcadastro === "2");

              console.log('Endereços do usuário logado (Cobrança):', this.enderecoCobrancaUsuarioLogadoAPI);
              console.log('Endereços do usuário logado (Entrega):', this.enderecoEntregaUsuarioLogadoAPI);
            },
            (error) => {
              console.log("Erro ao buscar os endereços gerais", error);
            }
          );
        } else {
          console.error('O valor de idUsuario não pôde ser convertido para um número válido.');
        }
      } else {
        console.error('Erro ao descriptografar idUsuario.');
      }
    } else {
      console.error('idUsuario criptografado não foi encontrado no sessionStorage.');
    }
  }

  getEnderecoCobrancaUsuarioLogado(): Observable<EnderecoEntrega[]> {
    return of (this.enderecoCobrancaUsuarioLogadoAPI);
  }

  getEnderecoEntregaUsuarioLogado(): Observable<EnderecoEntrega[]> {
    return of (this.enderecoEntregaUsuarioLogadoAPI);
  }
  // ====================================================================================== //

  atualizarTelefonesUsuarioLogadoAPI() {
    // Chave secreta usada para criptografia (a mesma chave que você usou para criptografar)
    const secretKeyidUsuario = 'idUsuario';

    // Valor criptografado recuperado do sessionStorage
    const encryptedIdUsuario = sessionStorage.getItem('u');

    // Verifique se o valor criptografado existe e, em seguida, faça a descriptografia
    if (encryptedIdUsuario) {
      const decryptedIdUsuario = AES.decrypt(encryptedIdUsuario, secretKeyidUsuario);

      // Verifique se a descriptografia foi bem-sucedida
      if (decryptedIdUsuario.sigBytes > 0) {
        const idUsuario = parseInt(decryptedIdUsuario.toString(CryptoJS.enc.Utf8), 10); // Converta para número

        // Verifique se idUsuario não é um NaN (valor inválido)
        if (!isNaN(idUsuario)) {
          this.apiTelefones.buscarTelefones().subscribe(
            (telefonesAPI) => {
              this.telefonesAPI = telefonesAPI;

              // Filtra telefones com o mesmo idUsuario
              this.telefonesUsuarioLogadoAPI = telefonesAPI.filter((telefone) => telefone.LoginId === idUsuario);

              console.log('Telefones do usuário logado:', this.telefonesUsuarioLogadoAPI);
            },
            (error) => {
              console.log("Erro ao buscar os telefones gerais", error);
            }
          );
        } else {
          console.error('O valor de idUsuario não pôde ser convertido para um número válido.');
        }
      } else {
        console.error('Erro ao descriptografar idUsuario.');
      }
    } else {
      console.error('idUsuario criptografado não foi encontrado no sessionStorage.');
    }
  }


  getTelefonesUsuarioLogado(): Observable<any[]> {
    return of (this.telefonesUsuarioLogadoAPI);
  }

  // ====================================================================================== //
  // CONTROLE DE ACESSO //

  // Método para atualizar e armazenar o valor no Local Storage
  setMostrarLateralUsuario(value: boolean): void {
    const valueToEncrypt = value; // Substitua pelo valor booleano que você deseja armazenar
    const secretKeyLateral = 'valorLateral';
    const encryptedValue = AES.encrypt(valueToEncrypt.toString(), secretKeyLateral).toString();
    this.mostrarLateralUsuario.next(value);
    sessionStorage.setItem('lu', encryptedValue); // 'lu' é a chave para o Local Storage
  }

  // Método para obter o valor como um observable
  getMostrarLateralUsuario(): Observable<boolean> {
    return this.mostrarLateralUsuario.asObservable();
  }

  // ====================================================================================== //

  setMostrarLateralAdministrador(value: boolean): void {
    const valueToEncrypt = value; // Substitua pelo valor booleano que você deseja armazenar
    const secretKeyLateral = 'valorLateral';
    const encryptedValue = AES.encrypt(valueToEncrypt.toString(), secretKeyLateral).toString();
    this.mostrarLateralAdministrador.next(value);
    sessionStorage.setItem('la', encryptedValue); // 'la' é a chave para o Local Storage
  }

  // Método para obter o valor como um observable
  getMostrarLateralAdministrador(): Observable<boolean> {
    return this.mostrarLateralAdministrador.asObservable();
  }


}
