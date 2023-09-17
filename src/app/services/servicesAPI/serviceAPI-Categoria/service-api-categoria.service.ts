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
    const endpoint = "categoria";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarCategoria(data: any) {
    const endpoint = "categoria";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  atualizarCategoria(idCategoria: number, novosDados: any) {
    const endpoint = `categoria/${idCategoria}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirCategoria(categoriaId: number) {
    const endpoint = `categoria/${categoriaId}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }


}
