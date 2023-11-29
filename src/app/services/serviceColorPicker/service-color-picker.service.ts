import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ServiceApiCoresService } from '../servicesAPI/serviceAPI-Cores/service-api-cores.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceColorPickerService {

  constructor(
    private serviceApiCores: ServiceApiCoresService
  ) { }

  cores: any[] = []

  //Declarando os tons como observaveis
  private ton1 = new BehaviorSubject<string>('');
  ton1$ = this.ton1.asObservable();

  private ton2 = new BehaviorSubject<string>('');
  ton2$ = this.ton2.asObservable();

  private ton3 = new BehaviorSubject<string>('');
  ton3$ = this.ton3.asObservable();

  private ton4 = new BehaviorSubject<string>('');
  ton4$ = this.ton4.asObservable();

  private ton5 = new BehaviorSubject<string>('');
  ton5$ = this.ton5.asObservable();

  private ton6 = new BehaviorSubject<string>('');
  ton6$ = this.ton6.asObservable();

  private ton7 = new BehaviorSubject<string>('');
  ton7$ = this.ton7.asObservable();

  private ton8 = new BehaviorSubject<string>('');
  ton8$ = this.ton8.asObservable();

  private ton9 = new BehaviorSubject<string>('');
  ton9$ = this.ton9.asObservable();

  private ton10 = new BehaviorSubject<string>('');
  ton10$ = this.ton10.asObservable();

  private ton11 = new BehaviorSubject<string>('');
  ton11$ = this.ton11.asObservable();

  atualizarTon1(novaCor: string) {
    this.ton1.next(novaCor);
  }

  atualizarTon2(novaCor: string) {
    this.ton2.next(novaCor);
  }

  atualizarTon3(novaCor: string) {
    this.ton3.next(novaCor);
  }

  atualizarTon4(novaCor: string) {
    this.ton4.next(novaCor);
  }

  atualizarTon5(novaCor: string) {
    this.ton5.next(novaCor);
  }

  atualizarTon6(novaCor: string) {
    this.ton6.next(novaCor);
  }

  atualizarTon7(novaCor: string) {
    this.ton7.next(novaCor);
  }

  atualizarTon8(novaCor: string) {
    this.ton8.next(novaCor);
  }

  atualizarTon9(novaCor: string) {
    this.ton9.next(novaCor);
  }

  atualizarTon10(novaCor: string) {
    this.ton10.next(novaCor);
  }

  atualizarTon11(novaCor: string) {
    this.ton11.next(novaCor);
  }

  // ================================================================================= //
  // API

  getCores(): Observable<any[]> {
    return of (this.cores);
  }

  async buscarCoresDaAPI() {
    try {
      const coresAPI = await this.serviceApiCores.buscarCores().toPromise();
      if (coresAPI) {
        this.cores = coresAPI;
      } else {
        console.error('Erro ao buscar cores da API: coresAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar cores da API', error);
    }
  }

}
