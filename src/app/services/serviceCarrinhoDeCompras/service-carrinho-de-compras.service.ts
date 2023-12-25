import { Injectable } from '@angular/core';
import { Produtos } from '../serviceCategorias/service-categorias.service';
import { Observable, of } from 'rxjs';
import { ServiceApiCarrinhoService } from '../servicesAPI/serviceAPI-Carrinho/service-api-carrinho.service';

export interface CarrinhoDeCompra {
  prodId?: number;
  imagemProduto?: string;
  nomeProduto?: string;
  quantidade?: number;
  altura?: number;
  largura?: number;
  comprimento?: number;
  peso?: number;
  preco?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCarrinhoDeComprasService {

  constructor(
    private carrinhoAPIService: ServiceApiCarrinhoService
  ){}

  //==================================================================================================================================//
  // Variáveis
  
  private carrinhoVisitado = false;
  carrinhoCabeca: any[] = [];
  carrinhoCorpo: any[] = [];
  
  //==================================================================================================================================//
  // Métodos

  setCarrinhoVisitado(): void {
    this.carrinhoVisitado = true;
  }

  isCarrinhoVisitado(): boolean {
    return this.carrinhoVisitado;
  }

  getCarrinhoCabeca(): Observable<any[]> {
    return of (this.carrinhoCabeca);
  }

  getCarrinhoCorpo(): Observable<any[]> {
    return of (this.carrinhoCorpo);
  }

  //==================================================================================================================================//
  // API

  async atualizarCarrinhoCabecaAPI() {
    try {
      const carrinhoCabecaAPI = await this.carrinhoAPIService.buscarCarrinhoCabecas().toPromise();
      if (carrinhoCabecaAPI) {
        this.carrinhoCabeca = carrinhoCabecaAPI;
      } else {
        console.error('Erro ao buscar CarrinhoCabeça da API: CarrinhoCabeça é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar CarrinhoCabeça da API', error);
    }
  }

  async atualizarCarrinhoCorpoAPI() {
    try {
      const carrinhoCorpoAPI = await this.carrinhoAPIService.buscarCarrinhoCorpo().toPromise();
      if (carrinhoCorpoAPI) {
        this.carrinhoCorpo = carrinhoCorpoAPI;
      } else {
        console.error('Erro ao buscar CarrinhoCorpo da API: CarrinhoCorpo é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar CarrinhoCorpo da API', error);
    }
  }

  //==================================================================================================================================//  

}
