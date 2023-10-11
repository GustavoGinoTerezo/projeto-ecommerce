import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiUsuariosService } from '../servicesAPI/serviceAPI-Usuarios/service-api-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuariosService {

  constructor(
    private serviceUsuariosAPI: ServiceApiUsuariosService
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

  usuariosAPI: Usuario[] = []

  getUsuarios(): Observable<Usuario[]> {
    return of (this.usuariosAPI);
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

        console.log(this.usuariosAPI)

      } else {
        console.error('Erro ao buscar categorias da API: categoriasAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar categorias da API', error);
    }
  }

}
