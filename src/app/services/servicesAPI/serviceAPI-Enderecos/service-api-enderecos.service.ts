import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiEnderecosService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarEnderecos() {
    const endpoint = "endereco";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  atualizarEnderecos(enderecoID: number, novosDados: any) {
    const endpoint = `endereco/${enderecoID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirEnderecos(enderecoID: number) {
    const endpoint = `endereco/${enderecoID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
