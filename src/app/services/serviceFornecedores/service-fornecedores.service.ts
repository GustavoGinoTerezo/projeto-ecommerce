import { Injectable } from '@angular/core';
import { ServiceApiFornecedoresService } from '../servicesAPI/serviceAPI-Fornecedores/service-api-fornecedores.service';
import { Observable, of } from 'rxjs';
import { Estado } from '../serviceEstados/service-estados.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceFornecedoresService {

  fornecedores: any[] = []

  constructor(
    private fornecedoresAPIService: ServiceApiFornecedoresService,
  ) {}

  getFornecedores(): Observable<Estado[]> {
    return of (this.fornecedores);
  }

  //==================================================================================================================================//
  // API

  async atualizarFornecedoresDaAPI() {
    try {
      const fornecedoresAPI = await this.fornecedoresAPIService.buscarFornecedores().toPromise();
      if (fornecedoresAPI) {
        this.fornecedores = fornecedoresAPI;
      } else {
        console.error('Erro ao buscar estados da API: estadosAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar estados da API', error);
    }
  }
}
