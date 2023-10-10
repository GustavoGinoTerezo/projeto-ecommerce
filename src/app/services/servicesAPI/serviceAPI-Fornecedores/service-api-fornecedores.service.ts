import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiFornecedoresService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarFornecedores() {
    const endpoint = "fornecedor";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarFornecedores(data: any) {
    const endpoint = "fornecedor";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarFornecedores(idFornecedores: number, novosDados: any) {
    const endpoint = `fornecedor/${idFornecedores}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirFornecedores(idFornecedores: number) {
    const endpoint = `fornecedor/${idFornecedores}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
