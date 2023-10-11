import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiUsuariosService } from '../servicesAPI/serviceAPI-Usuarios/service-api-usuarios.service';
import { ServiceApiTelefonesService } from '../servicesAPI/serviceAPI-Telefones/service-api-telefones.service';
import { ServiceApiEmailsService } from '../servicesAPI/serviceAPI-Emails/service-api-emails.service';
import { ServiceApiEnderecosService } from '../servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuariosService {

  constructor(
    private serviceUsuariosAPI: ServiceApiUsuariosService,
    private serviceTelefonesAPI: ServiceApiTelefonesService,
    private serviceEmailsAPI: ServiceApiEmailsService,
    private serviceEnderecosAPI: ServiceApiEnderecosService,
  ){

  }

  usuarios: Usuario[] = [
    {
      id: 0,
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
        {
          identificacao: "Principal",
          cep: 9999999,
          cidade: "ABC",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
        {
          identificacao: "Secundário 1",
          cep: 9999999,
          cidade: "Teste",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
      ]
    },
    {
      id: 1,
      nome: 'Teste2',
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
        {
          identificacao: "Principal",
          cep: 9999999,
          cidade: "ABC",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
        {
          identificacao: "Secundário 1",
          cep: 9999999,
          cidade: "Teste",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
      ]
    },
    {
      id: 2,
      nome: 'Teste3',
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
        {
          identificacao: "Principal",
          cep: 9999999,
          cidade: "ABC",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
        {
          identificacao: "Secundário 1",
          cep: 998,
          cidade: "Teste",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
      ]
    },
    {
      id: 3,
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
        {
          identificacao: "Principal",
          cep: 9999999,
          cidade: "ABC",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
        {
          identificacao: "Secundário 1",
          cep: 9999999,
          cidade: "Teste",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
      ]
    },
    {
      id: 4,
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
        {
          identificacao: "Principal",
          cep: 9999999,
          cidade: "ABC",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
        {
          identificacao: "Secundário 1",
          cep: 9999999,
          cidade: "Teste",
          bairro: "Teste",
          endereco: "Teste",
          numeroResidencia: 99
        },
      ]
    },
  ]

  usuariosAPI: any[] = []

  telefonesAPI: any[] = []

  emailAPI: any[] = []

  enderecosAPI: any[] = []


  getUsuarios(): Observable<any[]> {
    return of (this.usuariosAPI);
  }

  getTelefones(): Observable<any[]> {
    return of (this.telefonesAPI);
  }

  getEmail(): Observable<any[]> {
    return of (this.emailAPI);
  }

  getEnderecos(): Observable<any[]> {
    return of (this.enderecosAPI);
  }

  getUsuariosMocado(): Usuario[] {
    return this.usuarios;
  }

  getUsuarioTabela() {
    return Promise.resolve(this.usuarios);
  }

  //==================================================================================================================================//
  // API

  async buscarUsuariosDaAPI() {
    try {
      const usuariosAPI = await this.serviceUsuariosAPI.buscarUsuarios().toPromise();
      if (usuariosAPI) {
        this.usuariosAPI = usuariosAPI;
      } else {
        console.error('Erro ao buscar usuarios da API: usuarios é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar usuarios da API', error);
    }
  }

  async buscarTelefonesDaAPI() {
    try {
      const telefonesAPI = await this.serviceTelefonesAPI.buscarTelefones().toPromise();
      if (telefonesAPI) {
        this.telefonesAPI = telefonesAPI;
      } else {
        console.error('Erro ao buscar telefones da API: telefones é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar telefones da API', error);
    }
  }

  async buscarEmailsDaAPI() {
    try {
      const emailsAPI = await this.serviceEmailsAPI.buscarEmails().toPromise();
      if (emailsAPI) {
        this.emailAPI = emailsAPI;
      } else {
        console.error('Erro ao buscar emails da API: telefones é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar emails da API', error);
    }
  }

  async buscarEnderecosDaAPI() {
    try {
      const enderecosAPI = await this.serviceEnderecosAPI.buscarEnderecos().toPromise();
      if (enderecosAPI) {
        this.enderecosAPI = enderecosAPI;
      } else {
        console.error('Erro ao buscar enderecos da API: enderecos é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar enderecos da API', error);
    }
  }

  async buscarDadosDaAPI() {
    await this.buscarUsuariosDaAPI();
    await this.buscarTelefonesDaAPI();
    await this.buscarEmailsDaAPI();
    await this.buscarEnderecosDaAPI();
  }




}
