import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiUsuariosService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarUsuarios() {
    const endpoint = "user";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  atualizarUsuario(userID: number, novosDados: any) {
    const endpoint = `user/${userID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirUsuario(userID: number) {
    const endpoint = `user/${userID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
