import { Injectable } from '@angular/core';
import { Pedido } from '../servicePedido/service-pedido.service';
import { BehaviorSubject, Observable, Subject, of, switchMap, take } from 'rxjs';
import { ServiceApiUsuarioLogadoService } from '../servicesAPI/serviceAPI-UsuarioLogado/service-api-usuario-logado.service';
import { ServiceApiEnderecosService } from '../servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';
import { ServiceApiTelefonesService } from '../servicesAPI/serviceAPI-Telefones/service-api-telefones.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

export interface Usuario {
  id?: number;
  nome?: string;
  emailprinc?: string;
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
  endId?: number;
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

  private inicializacaoUserConcluidaSubject = new Subject<void>();
  private telefoneCarregadoSubject = new Subject<void>();
  private enderecosCarregadosSubject = new Subject<void>();

  private mostrarLateralUsuario = new BehaviorSubject<boolean>(false);
  private mostrarLateralAdministrador = new BehaviorSubject<boolean>(false);
  // Obtenha o nome da chave para o Local Storage
  private readonly localStorageKeyUser = 'lu';
  private readonly localStorageKeyAdmin = 'la';

  constructor(
    private apiEnderecos: ServiceApiEnderecosService,
    private apiTelefones: ServiceApiTelefonesService,
    private apiUsuario: ServiceApiUsuarioLogadoService
  ) {

    const b3dc20a9c71655e6aacd4eca882ee40db9840b7ee63449ec3d4c489d90f97acd = sessionStorage.getItem(this.localStorageKeyUser);
    if (b3dc20a9c71655e6aacd4eca882ee40db9840b7ee63449ec3d4c489d90f97acd) {
      const bca28149008cc4d67ff50cc56428acf41769c98ad543b93c4644fcc7c7c713e7  = '915004b899b1c54c1ebb0ac65e5bf4973e671c725114c7b56c17b313cdca2402';
      const a7c780a56fe0d647d178aeb6310093f48e95220cf217e749eb29c7cce2e8b206 = AES.decrypt(b3dc20a9c71655e6aacd4eca882ee40db9840b7ee63449ec3d4c489d90f97acd, bca28149008cc4d67ff50cc56428acf41769c98ad543b93c4644fcc7c7c713e7 );
      if (a7c780a56fe0d647d178aeb6310093f48e95220cf217e749eb29c7cce2e8b206.sigBytes > 0) {
        const BooleanValue = a7c780a56fe0d647d178aeb6310093f48e95220cf217e749eb29c7cce2e8b206.toString(CryptoJS.enc.Utf8) === 'true';
        this.mostrarLateralUsuario.next(BooleanValue);
      }
    }

    const e8c582580f5986fcb9aa66d0ef3d37c959706c6f0774b9888aee8b79989fc975 = sessionStorage.getItem(this.localStorageKeyAdmin);
    if (e8c582580f5986fcb9aa66d0ef3d37c959706c6f0774b9888aee8b79989fc975) {
      const f0b0b743645e63793355e744ad8e422f24d502395f126ba420be48f4b5d28b35 = '89ba4b199e1c5afb70d1444d5338e3d773b3a8d4a52d731f2cf39f4f043d1c6a';
      const a5f3f7caf5832d607f698626c71f5122afba5db22ff26c9fe1e5c6f33d4f135f = AES.decrypt(e8c582580f5986fcb9aa66d0ef3d37c959706c6f0774b9888aee8b79989fc975, f0b0b743645e63793355e744ad8e422f24d502395f126ba420be48f4b5d28b35);
      if (a5f3f7caf5832d607f698626c71f5122afba5db22ff26c9fe1e5c6f33d4f135f.sigBytes > 0) {
        const BooleanValue = a5f3f7caf5832d607f698626c71f5122afba5db22ff26c9fe1e5c6f33d4f135f.toString(CryptoJS.enc.Utf8) === 'true';
        this.mostrarLateralAdministrador.next(BooleanValue);
      }
    }
  }

  usuarioLogado: Usuario[] = [
    {
      nome: 'Teste',
      emailprinc: 'teste@teste.com',
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

  usuarioLogadoAPI: any[] = []
  enderecosAPI: any[] = []
  enderecoCobrancaUsuarioLogadoAPI: any[] = []
  enderecoEntregaUsuarioLogadoAPI: any[] = []
  telefonesAPI: Telefone[] = []
  telefonesUsuarioLogadoAPI: Telefone[] = []

  getUsuarioMocado(): Usuario[] {
    return this.usuarioLogado;
  }

  getUsuario(): Observable<any[]> {
    return of (this.usuarioLogadoAPI);
  }

  // ====================================================================================== //

  atualizarEnderecoUsuarioLogadoAPI() {
    // Chave secreta usada para criptografia (a mesma chave que você usou para criptografar)
    const ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee = '3a5fcd67e16707188a6dd213303761fd530fed07434b8641044460fd9fdde581';

    // Valor criptografado recuperado do sessionStorage
    const e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01 = sessionStorage.getItem('u');

    // Verifique se o valor criptografado existe e, em seguida, faça a descriptografia
    if (e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01) {
      const ef8e3dae5e45b8aeb8cda97ad3e012d9fa6115f03fa5c527ede47a83a7e73b68 = AES.decrypt(e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01, ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee);

      // Verifique se a descriptografia foi bem-sucedida
      if (ef8e3dae5e45b8aeb8cda97ad3e012d9fa6115f03fa5c527ede47a83a7e73b68.sigBytes > 0) {
        const idUsuario = parseInt(ef8e3dae5e45b8aeb8cda97ad3e012d9fa6115f03fa5c527ede47a83a7e73b68.toString(CryptoJS.enc.Utf8), 10); // Converta para número

        // Verifique se idUsuario não é um NaN (valor inválido)
        if (!isNaN(idUsuario)) {
          this.apiEnderecos.buscarEnderecos().subscribe(
            (enderecosAPI) => {
              this.enderecosAPI = enderecosAPI;

              // Filtra endereços com tpCadastro igual a "1" para o array enderecoCobrancaUsuarioLogadoAPI
              this.enderecoCobrancaUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === idUsuario && endereco.tpcadastro === "1");

              // Filtra endereços com tpCadastro igual a "2" para o array enderecoEntregaUsuarioLogadoAPI
              this.enderecoEntregaUsuarioLogadoAPI = enderecosAPI.filter((endereco) => endereco.LoginId === idUsuario && endereco.tpcadastro === "2");

              sessionStorage.setItem('startEnderecos', 'ok')
              this.enderecosCarregadosSubject.next();
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
    const ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee = '3a5fcd67e16707188a6dd213303761fd530fed07434b8641044460fd9fdde581';

    // Valor criptografado recuperado do sessionStorage
    const e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01 = sessionStorage.getItem('u');

    // Verifique se o valor criptografado existe e, em seguida, faça a descriptografia
    if (e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01) {
      const ef8e3dae5e45b8aeb8cda97ad3e012d9fa6115f03fa5c527ede47a83a7e73b68 = AES.decrypt(e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01, ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee);

      // Verifique se a descriptografia foi bem-sucedida
      if (ef8e3dae5e45b8aeb8cda97ad3e012d9fa6115f03fa5c527ede47a83a7e73b68.sigBytes > 0) {
        const idUsuario = parseInt(ef8e3dae5e45b8aeb8cda97ad3e012d9fa6115f03fa5c527ede47a83a7e73b68.toString(CryptoJS.enc.Utf8), 10); // Converta para número

        // Verifique se idUsuario não é um NaN (valor inválido)
        if (!isNaN(idUsuario)) {
          this.apiTelefones.buscarTelefones().subscribe(
            (telefonesAPI) => {
              this.telefonesAPI = telefonesAPI;

              // Filtra telefones com o mesmo idUsuario
              this.telefonesUsuarioLogadoAPI = telefonesAPI.filter((telefone) => telefone.LoginId === idUsuario);

              this.telefoneCarregadoSubject.next();
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
    // Agora, este método retornará um Observable que completa quando a atualização estiver finalizada
    return this.telefoneCarregadoSubject.asObservable().pipe(
      // Espera até que o sinal de atualização esteja completo
      take(1),
      // Em seguida, emite os telefones do usuário logado
      switchMap(() => of(this.telefonesUsuarioLogadoAPI))
    );
  }

  // ====================================================================================== //
  // CONTROLE DE ACESSO //

  // Método para atualizar e armazenar o valor no Local Storage
  setMostrarLateralUsuario(value: boolean): void {
    const f66ff88644488ab96512a5d46504b7092a6772bb6cefc25a33155d99e5d7bf9c = value; // Substitua pelo valor booleano que você deseja armazenar
    const bca28149008cc4d67ff50cc56428acf41769c98ad543b93c4644fcc7c7c713e7 = '915004b899b1c54c1ebb0ac65e5bf4973e671c725114c7b56c17b313cdca2402';
    const b3dc20a9c71655e6aacd4eca882ee40db9840b7ee63449ec3d4c489d90f97acd = AES.encrypt(f66ff88644488ab96512a5d46504b7092a6772bb6cefc25a33155d99e5d7bf9c.toString(), bca28149008cc4d67ff50cc56428acf41769c98ad543b93c4644fcc7c7c713e7).toString();
    this.mostrarLateralUsuario.next(value);
    sessionStorage.setItem('lu', b3dc20a9c71655e6aacd4eca882ee40db9840b7ee63449ec3d4c489d90f97acd); // 'lu' é a chave para o Local Storage
  }

  // Método para obter o valor como um observable
  getMostrarLateralUsuario(): Observable<boolean> {
    return this.mostrarLateralUsuario.asObservable();
  }

  // ====================================================================================== //

  setMostrarLateralAdministrador(value: boolean): void {
    const df86151330606924f008e64fe2f30777205edce46eb688fed337a2c333410a92 = value; // Substitua pelo valor booleano que você deseja armazenar
    const f0b0b743645e63793355e744ad8e422f24d502395f126ba420be48f4b5d28b35 = '89ba4b199e1c5afb70d1444d5338e3d773b3a8d4a52d731f2cf39f4f043d1c6a';
    const e8c582580f5986fcb9aa66d0ef3d37c959706c6f0774b9888aee8b79989fc975 = AES.encrypt(df86151330606924f008e64fe2f30777205edce46eb688fed337a2c333410a92.toString(), f0b0b743645e63793355e744ad8e422f24d502395f126ba420be48f4b5d28b35).toString();
    this.mostrarLateralAdministrador.next(value);
    sessionStorage.setItem('la', e8c582580f5986fcb9aa66d0ef3d37c959706c6f0774b9888aee8b79989fc975); // 'la' é a chave para o Local Storage
  }

  // Método para obter o valor como um observable
  getMostrarLateralAdministrador(): Observable<boolean> {
    return this.mostrarLateralAdministrador.asObservable();
  }

  getEnderecosCarregadosObservable() {
    return this.enderecosCarregadosSubject.asObservable();
  }

  // ====================================================================================== //

  async atualizarUsuarioAPI(){

    const e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01 = sessionStorage.getItem('u')
    const ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee = '3a5fcd67e16707188a6dd213303761fd530fed07434b8641044460fd9fdde581'
    
    if(e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01){

      const userIDStorage = CryptoJS.AES.decrypt(e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01, ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee);

      if (userIDStorage.sigBytes > 0) {
        const userID = JSON.parse(userIDStorage.toString(CryptoJS.enc.Utf8));
      
      try {
        const usuarioAPI = await this.apiUsuario.buscarUsuario(userID).toPromise();
        if (usuarioAPI) {
          this.usuarioLogadoAPI = usuarioAPI;
          console.log(this.usuarioLogadoAPI)

          this.inicializacaoUserConcluidaSubject.next();
          sessionStorage.setItem('startUser', 'ok')
        } else {
          console.error('Erro ao buscar usuarioAPI da API: usuarioAPI é undefined');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário da API', error);
      }
      }
     
    }
  }

  getInicializacaoConcluida() {
    return this.inicializacaoUserConcluidaSubject.asObservable();
  }
  
}


