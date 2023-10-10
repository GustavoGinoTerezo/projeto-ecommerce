import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiNotaFiscalService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  //================================================//
  // Nota Entrada Cabeça

  buscarNotaEntradaCabeca() {
    const endpoint = "notaentradacabeca";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarNotaEntradaCabeca(data: any) {
    const endpoint = "notaentradacabeca";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarNotaEntradaCabeca(idNotaEntradaCabeca: number, novosDados: any) {
    const endpoint = `notaentradacabeca/${idNotaEntradaCabeca}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirNotaEntradaCabeca(idNotaEntradaCabeca: number) {
    const endpoint = `notaentradacabeca/${idNotaEntradaCabeca}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }

  //================================================//
  // Nota Entrada Corpo

  buscarNotaEntradaCorpo() {
    const endpoint = "notaentradacorpo";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarNotaEntradaCorpo(data: any) {
    const endpoint = "notaentradacorpo";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarNotaEntradaCorpo(idNotaEntradaCorpo: number, novosDados: any) {
    const endpoint = `notaentradacorpo/${idNotaEntradaCorpo}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirNotaEntradaCorpo(idNotaEntradaCorpo: number) {
    const endpoint = `notaentradacorpo/${idNotaEntradaCorpo}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
