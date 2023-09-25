import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiTelefonesService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarTelefones() {
    const endpoint = "telefone";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }
}
