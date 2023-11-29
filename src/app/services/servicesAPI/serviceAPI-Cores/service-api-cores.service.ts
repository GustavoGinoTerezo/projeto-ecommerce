import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiCoresService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarCores() {
    const endpoint = "color";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  atualizarCor(corID: number, novosDados: any) {
    const endpoint = `color/${corID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirCor(corID: number) {
    const endpoint = `color/${corID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
