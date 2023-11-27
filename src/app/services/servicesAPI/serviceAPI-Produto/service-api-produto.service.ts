import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  //================================================//
  //ADICIONAR PRODUTO

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

  //================================================//
  //ADICIONAR POSIÇÃO DO PRODUTO

  buscarPosicaoProdutos() {
    const endpoint = "posprod";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarPosicaoProduto(data: any) {
    const endpoint = "posprod";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarPosicaoProduto(idPosProduto: number, novosDados: any) {
    const endpoint = `posprod/${idPosProduto}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirPosicaoProduto(idPosProduto: number) {
    const endpoint = `posprod/${idPosProduto}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }

  //================================================//
  //ADICIONAR FOTOS DO PRODUTO
  buscarFotosProdutos() {
    const endpoint = "prodfoto";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarFotosProduto(data: FormData) {
    const endpoint = "prodfoto";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  excluirFotosProduto(prodFotoId: number) {
    const endpoint = `prodfoto/${prodFotoId}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }

}
