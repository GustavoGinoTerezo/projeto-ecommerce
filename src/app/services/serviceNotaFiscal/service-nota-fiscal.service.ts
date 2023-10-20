import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceApiNotaFiscalService } from '../servicesAPI/serviceAPI-NotaFiscal/service-api-nota-fiscal.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceNotaFiscalService {

  notaFiscalCabeca: any[] = []
  notaFiscalCorpo: any[] = []

  constructor(
    private notaFiscalAPIService: ServiceApiNotaFiscalService,
  ) {}

  getNotaFiscalCorpo(): Observable<any[]> {
    return of (this.notaFiscalCorpo);
  }

  //==================================================================================================================================//
  // API

  async atualizarNotaFiscalCorpoDaAPI() {
    try {
      const notaFiscalCorpoAPI = await this.notaFiscalAPIService.buscarNotaEntradaCorpo().toPromise();
      if (notaFiscalCorpoAPI) {
        this.notaFiscalCorpo = notaFiscalCorpoAPI;
      } else {
        console.error('Erro ao buscar NotaFiscalCorpo da API: NotaFiscalCorpo é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar NotaFiscalCorpo da API', error);
    }
  }
  
}
