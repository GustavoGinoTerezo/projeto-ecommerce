import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIRedefinirSenhaService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  solicitarRedefinirSenha(data: any) {
    const endpoint = "forgot-password";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  alterarSenha(data: any) {
    const endpoint = "reset-password";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }
}
