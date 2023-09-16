import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiRegistrarService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  registrar(data: any) {
    const endpoint = "register";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  registrarEndereco(data: any) {
    const endpoint = "endereco";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  registrarTelefone(data: any) {
    const endpoint = "telefone";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

}
