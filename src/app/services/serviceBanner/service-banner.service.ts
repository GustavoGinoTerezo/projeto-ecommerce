import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ServiceApiBannerService } from '../servicesAPI/serviceAPI-Banner/service-api-banner.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceBannerService {

  private bannersAPISubject = new BehaviorSubject<any[]>([]);
  bannersAPI$ = this.bannersAPISubject.asObservable();

  private inicializacaoConcluidaSubject = new BehaviorSubject<boolean>(false);
  inicializacaoConcluida$ = this.inicializacaoConcluidaSubject.asObservable();

  constructor(
    private apiBannerService: ServiceApiBannerService
  ) { }

  getBanners(): Observable<any[]> {
    return this.bannersAPI$;
  }

  async atualizarBannerDaAPI() {
    try {
      const BannerAPI = await this.apiBannerService.buscarFotosBanners().toPromise();
      if (BannerAPI) {
        this.bannersAPISubject.next(BannerAPI);
        this.inicializacaoConcluidaSubject.next(true); // Notifica a conclusão da inicialização
      } else {
        console.error('Erro ao buscar Banner da API: BannerAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar Banner da API', error);
    }
  }
}
