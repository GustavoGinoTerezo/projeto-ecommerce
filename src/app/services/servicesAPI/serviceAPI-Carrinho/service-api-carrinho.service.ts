import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiCarrinhoService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  //================================================//
  // CARRINHO CABEÇA

  buscarCarrinhoCabecas() {
    const endpoint = "carrinhocabeca";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarCarrinhoCabeca(data: any) {
    const endpoint = "carrinhocabeca";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarCarrinhoCabeca(idCarrinhoCabeca: number, novosDados: any) {
    const endpoint = `carrinhocabeca/${idCarrinhoCabeca}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirCarrinhoCabeca(idCarrinhoCabeca: number) {
    const endpoint = `carrinhocabeca/${idCarrinhoCabeca}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }

  //================================================//
  // CARRINHO CORPO

  buscarCarrinhoCorpo() {
    const endpoint = "carrinhocorpo";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarCarrinhoCorpo(data: any) {
    const endpoint = "carrinhocorpo";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarCarrinhoCorpo(idCarrinhoCorpo: string, novosDados: any) {
    const endpoint = `carrinhocorpo/${idCarrinhoCorpo}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirCarrinhoCorpo(idCarrinhoCorpo: string) {
    const endpoint = `carrinhocorpo/${idCarrinhoCorpo}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }

}
