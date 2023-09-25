import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiUsuarioService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  idUsuario = sessionStorage.getItem('u');

  buscarEnderecos(){
    const endpoint = "endereco"
    const url = this.urlGlobal + endpoint + this.idUsuario;
    return this.http.get<any>(url);
  }
}
