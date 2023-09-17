import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIProdutoService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarProdutos() {
    const endpoint = "produto";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarProduto(data: any) {
    const endpoint = "produto";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarProduto(idProduto: number, novosDados: any) {
    const endpoint = `produto/${idProduto}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirProduto(idProduto: number) {
    const endpoint = `produto/${idProduto}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }

}
