import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceColorPickerService {

  constructor() { }

  //Declarando os tons como observaveis
  private ton1 = new BehaviorSubject<string>('rgba(131, 125, 125, 0.829)');
  ton1$ = this.ton1.asObservable();

  private ton2= new BehaviorSubject<string>('#6a6a6efd');
  ton2$ = this.ton2.asObservable();

  private ton3 = new BehaviorSubject<string>('rgb(41,44,47)');
  ton3$ = this.ton3.asObservable();

  atualizarTon1(novaCor: string) {
    this.ton1.next(novaCor);
  }

  atualizarTon2(novaCor: string) {
    this.ton2.next(novaCor);
  }

  atualizarTon3(novaCor: string) {
    this.ton3.next(novaCor);
  }
}
