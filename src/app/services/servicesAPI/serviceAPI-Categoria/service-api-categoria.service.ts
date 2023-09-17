import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';
import { Observable } from 'rxjs';

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

  atualizarCategoria(idCategoria: number, novosDados: any) {
    const endpoint = `categoria/${idCategoria}`; // Suponhamos que você precise fornecer o ID da categoria a ser atualizada
    const url = this.urlGlobal.url + endpoint;

    // Use http.put para fazer uma solicitação PUT para atualizar a categoria.
    // Passa os novos dados no corpo da solicitação como o segundo argumento.
    return this.http.put<any>(url, novosDados);
  }

  excluirCategoria(categoriaId: number) {
    const endpoint = `categoria/${categoriaId}`; // Suponhamos que você precise fornecer o ID da categoria a ser excluída
    const url = this.urlGlobal.url + endpoint;
    // Use http.delete para fazer uma solicitação DELETE para excluir a categoria
    return this.http.delete<any>(url);
  }


}
