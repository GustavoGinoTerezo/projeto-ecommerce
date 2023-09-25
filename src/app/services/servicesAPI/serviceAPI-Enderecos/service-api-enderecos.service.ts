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
}
