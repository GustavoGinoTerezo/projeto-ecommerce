import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPICategoriaService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarCategorias() {
    const endpoint = "categoria"; // O endpoint da API para buscar todas as categorias
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url); // Use http.get para fazer uma solicitação GET
  }

  cadastrarCategoria(data: any) {
    const endpoint = "categoria";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarCategoria(data: any) {
    const endpoint = `categoria/${data.id}`; // Suponhamos que você precise fornecer o ID da categoria a ser atualizada
    const url = this.urlGlobal.url + endpoint;

    // Use http.put para fazer uma solicitação PUT para atualizar a categoria
    return this.http.put<any>(url, data);
  }


  excluirCategoria(categoriaId: number) {
    const endpoint = `categoria/${categoriaId}`; // Suponhamos que você precise fornecer o ID da categoria a ser excluída
    const url = this.urlGlobal.url + endpoint;

    // Use http.delete para fazer uma solicitação DELETE para excluir a categoria
    return this.http.delete<any>(url);
  }


}
