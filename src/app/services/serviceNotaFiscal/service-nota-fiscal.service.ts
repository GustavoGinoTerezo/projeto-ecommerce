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

  getNotaFiscalCabeca(): Observable<any[]> {
    return of (this.notaFiscalCabeca);
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
  
  async atualizarNotaFiscalCabecaDaAPI() {
    try {
      const notaFiscalCabecaAPI = await this.notaFiscalAPIService.buscarNotaEntradaCabeca().toPromise();
      if (notaFiscalCabecaAPI) {
        this.notaFiscalCabeca = notaFiscalCabecaAPI;
      } else {
        console.error('Erro ao buscar NotaFiscalCabeca da API: NotaFiscalCabeca é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar NotaFiscalCabeca da API', error);
    }
  }
  
}
