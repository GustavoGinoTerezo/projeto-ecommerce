import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, map, of } from 'rxjs';
import { ServiceAPICategoriaService } from '../servicesAPI/serviceAPI-Categoria/service-api-categoria.service';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlGlobalService } from '../servicesAPI/serviceUrlGlobal/service-url-global.service';
import { ServiceAPIProdutoService } from '../servicesAPI/serviceAPI-Produto/service-api-produto.service';
import { TelaPrincipalComponent } from 'src/app/componentes/telas/tela-principal/tela-principal.component';

export interface CategoriaVazia extends Categorias {
  nome: '';
}

export interface Categorias {
  catId?: number;
  nome?: string;
  produtos?: Produtos[] ;
}

export interface Produtos {
  prodId?: number;
  catId?: number;
  nome?: string;
  imagem?: Imagens[];
  preco?: number;
  status?: Status[];
  qtdEntrada?: any;
  qtdSaida?: any;
  descBreve?: string;
  descCompleta?: string;
  informacaoTecnica?: string;
  altura?: number;
  largura?: number;
  peso?: number;
  comprimento?: number;
  comentariosProduto?: ComentariosProdutos[];
  comentariosPendentes?: ComentariosProdutos[];
}

export interface PosicaoProdutos {
  posProdId?: number,
  posProdTp?: string,
  prodId?: number
}

export interface Imagens{
  imagem?: string;
}

interface Status {
  status: string;
}

export interface Entrada {
  quantEntrada?: number;
  dataEntrada?: String;
}

export interface Saida {
  quantSaida?: number;
  dataSaida?: String;
}

export interface ComentariosProdutos{
  id?: string;
  comentario?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ServiceCategoriasService {

  constructor(
    private apiCategoriaService: ServiceAPICategoriaService,
    private apiProdutos: ServiceAPIProdutoService,
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) { }

  private inicializacaoConcluidaSubject = new Subject<void>();

  categoriasAPI: Categorias[] = [];

  produtosAPI: Produtos[] = []

  posicaoProdutosAPI: PosicaoProdutos[] = []

  produtosDestaqueAPI: Produtos[] = [];

  produtosMaisVendidosAPI: Produtos[] = [];

  produtosEmPromocaoAPI: Produtos[] = [];

  // produtosMocado: Produtos[] = [
  //   {
  //     prodId: 0,
  //     nome: "Teste",
  //     qtdEntrada: [{
  //       quantEntrada: 10,
  //       dataEntrada: "10/10/2023"
  //     }],
  //     qtdSaida: [{
  //       quantSaida: 5,
  //       dataSaida: "11/10/2023"
  //     }],
  //   },
  //   {
  //     prodId: 1,
  //     nome: "Teste1",
  //   },
  //   {
  //     prodId: 2,
  //     nome: "Teste2",
  //   },
  //   {
  //     prodId: 3,
  //     nome: "Teste3",
  //   },
  //   {
  //     prodId: 4,
  //     nome: "Teste4",
  //   },
  //   {
  //     prodId: 5,
  //     nome: "Teste5",
  //   },
  // ]




  //==================================================================================================================================//

  getCategorias(): Observable<Categorias[]> {
    return of (this.categoriasAPI);
  }

  obterCategoriaPorNome(nome: string): Categorias | undefined {
    return this.categoriasAPI.find(
      (categoria) => categoria.nome && categoria.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  //PRODUTOS

  getProdutos(): Observable<Categorias[]> {
    return of (this.produtosAPI);
  }

  getPosicaoProdutos(): Observable<PosicaoProdutos[]> {
    return of (this.posicaoProdutosAPI)
  }

  obterProdutoPorNome(nome: string): any | undefined {
    return this.produtosAPI.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }
  //==================================================================================================================================//
  //PRODUTOS EM DESTAQUE
  getProdutosDestaque(): Observable<Produtos[]> {
    return of (this.produtosDestaqueAPI);
  }

  //MUDAR A URL COM O NOME DO PRODUTO
  obterProdutoPorNomeDestaque(nome: string): Produtos | undefined {
    return this.produtosDestaqueAPI.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  //PRODUTOS MAIS VENDIDOS
  getProdutosMaisVendidos(): Observable<Produtos[]> {
    return of (this.produtosMaisVendidosAPI);
  }

  //MUDAR A URL COM O NOME DO PRODUTO
  obterProdutoPorNomeMaisVendidos(nome: string): Produtos | undefined {
    return this.produtosMaisVendidosAPI.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  //PRODUTOS EM PROMOÇÃO
  getProdutosEmPromocao(): Observable<Produtos[]> {
    return of (this.produtosEmPromocaoAPI);
  }

  //MUDAR A URL COM O NOME DO PRODUTO
  obterProdutoPorNomeEmPromocao(nome: string): Produtos | undefined {
    return this.produtosEmPromocaoAPI.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  formatarNomeProduto(nomeProduto: string): string {
    const partesNome = nomeProduto.split('-');
    const nomeFormatado = partesNome[0].toUpperCase() + ' ' + partesNome.slice(1).join('-');
    return nomeFormatado;
  }
  
  

  //==================================================================================================================================//
  // API
  async atualizarCategoriasDaAPI() {
    try {
      const categoriasAPI = await this.apiCategoriaService.buscarCategorias().toPromise();
      if (categoriasAPI) {
        this.categoriasAPI = categoriasAPI;
        console.log("1");

        // Após obter as categorias da API, chame os métodos para atualizar produtos
        await this.atualizarProdutosDaAPI();
      } else {
        console.error('Erro ao buscar categorias da API: categoriasAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar categorias da API', error);
    }
  }

  async atualizarProdutosDaAPI() {
    try {
      const produtosAPI = await this.apiProdutos.buscarProdutos().toPromise();
      if (produtosAPI) {
        this.produtosAPI = produtosAPI;
        console.log("2");

        // Após obter os produtos da API, chame o método para atualizar a posição dos produtos
        await this.atualizarPosicaoProdutosDaAPI();
      } else {
        console.error('Erro ao buscar produtos da API: produtosAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos da API', error);
    }
  }

  async atualizarPosicaoProdutosDaAPI() {
    try {
      const posicaoProdutosAPI = await this.apiProdutos.buscarPosicaoProdutos().toPromise();
      if (posicaoProdutosAPI) {
        this.posicaoProdutosAPI = posicaoProdutosAPI;
        console.log("3");

        await this.atualizarProdutosDestaque();
      } else {
        console.error('Erro ao buscar posição de produtos da API: posicaoProdutosAPI é undefined');
      }
    } catch (error) {
      console.error('Erro ao buscar posição de produtos da API', error);
    }
  }

  async atualizarProdutosDestaque() {
    // Primeiro, filtre os objetos em posicaoProdutosAPI onde posProdTp é igual a "1"
    const produtosEmDestaque = this.posicaoProdutosAPI
      .filter((posicao) => posicao.posProdTp === '1')
      .map((posicao) => posicao.prodId);
    // Em seguida, filtre os produtos em produtosAPI com base nos IDs encontrados anteriormente
    this.produtosDestaqueAPI = this.produtosAPI
      .filter((produto) => produtosEmDestaque.includes(produto.prodId));
      console.log("4")
      await this.atualizarProdutosEmPromocao();
    return of(null);
  }

  async atualizarProdutosEmPromocao() {
    const produtosEmPromocao = this.posicaoProdutosAPI
      .filter((posicao) => posicao.posProdTp === '3')
      .map((posicao) => posicao.prodId);
    // Em seguida, filtre os produtos em produtosAPI com base nos IDs encontrados anteriormente
    this.produtosEmPromocaoAPI = this.produtosAPI
      .filter((produto) => produtosEmPromocao.includes(produto.prodId));
      console.log("5")
      await this.atualizarProdutosMaisVendidos();
    // // console.log(this.produtosEmPromocaoAPI); // Adicione este console.log para verificar o conteúdo do array
    return of(null);
  }

  async atualizarProdutosMaisVendidos() {
    // Primeiro, filtre os objetos em posicaoProdutosAPI onde posProdTp é igual a "2"
    const produtosMaisVendidos = this.posicaoProdutosAPI
      .filter((posicao) => posicao.posProdTp === '2')
      .map((posicao) => posicao.prodId);

    // Em seguida, filtre os produtos em produtosAPI com base nos IDs encontrados anteriormente
    this.produtosMaisVendidosAPI = this.produtosAPI
      .filter((produto) => produtosMaisVendidos.includes(produto.prodId));
      console.log("6")

      this.inicializacaoConcluidaSubject.next();
      sessionStorage.setItem('start', 'ok')

    return of(null);
  }

  getInicializacaoConcluida() {
    return this.inicializacaoConcluidaSubject.asObservable();
  }








}
