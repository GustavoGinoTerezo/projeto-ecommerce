import { Injectable } from '@angular/core';
import { ServiceApiComentariosService } from '../servicesAPI/serviceAPI-Comentarios/service-api-comentarios.service';
import { Observable, of } from 'rxjs';

export interface Comentarios {
  prodId?: string;
  mensagem?: string;
  aprovado?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceComentariosService {

  constructor(
    private comentariosAPIService: ServiceApiComentariosService,
  ){}

  comentariosAPI: Comentarios[] = []

  getComentarios(): Observable<Comentarios[]> {
    return of (this.comentariosAPI);
  }

  //==================================================================================================================================//
  // API

  async atualizarComentariosDaAPI() {
    try {
      const comentariosAPI = await this.comentariosAPIService.buscarComentarios().toPromise();
      if (comentariosAPI) {
        this.comentariosAPI = comentariosAPI;
        console.log("Comentários buscados com sucesso")
      } else {
        console.error('Erro ao buscar posição de produtos da API: posicaoProdutosAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar posição de produtos da API', error);
    }
  }

}
