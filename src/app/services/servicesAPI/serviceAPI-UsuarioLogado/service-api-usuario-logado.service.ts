import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiUsuarioLogadoService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarUsuario(userID: number) {
    const endpoint = `user/${userID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any>(url);
  }

}
