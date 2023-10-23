import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceApiCaixaService } from '../servicesAPI/serviceAPI-Caixa/service-api-caixa.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCaixaService {

  caixasAPI: any[] = []

  constructor(
    private apiCaixasService: ServiceApiCaixaService,
  ) { }

  getCaixas(): Observable<any[]> {
    return of (this.caixasAPI);
  }

  //==================================================================================================================================//
  // API

  async atualizarCaixasDaAPI() {
    try {
      const caixasAPI = await this.apiCaixasService.buscarCaixas().toPromise();
      if (caixasAPI) {
        this.caixasAPI = caixasAPI;
      } else {
        console.error('Erro ao buscar caixas da API: caixasAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar caixas da API', error);
    }
  }
}
