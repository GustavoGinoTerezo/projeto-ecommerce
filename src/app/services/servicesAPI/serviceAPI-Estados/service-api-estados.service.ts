import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiEstadosService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarEstados() {
    const endpoint = "uf";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarEstado(data: any) {
    const endpoint = "uf";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarEstado(idEstado: number, novosDados: any) {
    const endpoint = `uf/${idEstado}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirEstado(idEstado: number) {
    const endpoint = `uf/${idEstado}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
