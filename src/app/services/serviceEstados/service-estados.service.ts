import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceApiEstadosService } from '../servicesAPI/serviceAPI-Estados/service-api-estados.service';

export interface Estado {
  nome: string;
  UfId: string;
  icms: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceEstadosService {

  estadosAPI: Estado[] = []

  constructor(
    private apiEstadosService: ServiceApiEstadosService,
  ) { }

  getEstados(): Observable<Estado[]> {
    return of (this.estadosAPI);
  }

  //==================================================================================================================================//
  // API

  async atualizarEstadosDaAPI() {
    try {
      const estadosAPI = await this.apiEstadosService.buscarEstados().toPromise();
      if (estadosAPI) {
        this.estadosAPI = estadosAPI;
      } else {
        console.error('Erro ao buscar estados da API: estadosAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar estados da API', error);
    }
  }
}
