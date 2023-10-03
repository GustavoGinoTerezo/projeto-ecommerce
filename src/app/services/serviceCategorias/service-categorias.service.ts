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
  qtdEntrada?: Entrada[];
  qtdSaida?: Saida[];
  descBreve?: string;
  descCompleta?: string;
  especificacaoTecnica?: string;
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

  categorias: Categorias[] =
  [
    {
      nome: 'Boost',
      produtos: [
        {
          nome: 'mj-15-30-15',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512.jpg',
            },
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512-12321.jpg',
            },
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-US-Boost-15-30-15-12278-12321.jpg',
            },

          ],
          preco: 1234.10,
          qtdEntrada: [
            {
              quantEntrada: 10,
              dataEntrada: '10/05/2023',
            },
            {
              quantEntrada: 15,
              dataEntrada: '11/05/2023',
            },
            {
              quantEntrada: 10,
              dataEntrada: '12/05/2023',
            },
            {
              quantEntrada: 15,
              dataEntrada: '13/05/2023',
            },
            {
              quantEntrada: 10,
              dataEntrada: '14/05/2023',
            },
            {
              quantEntrada: 15,
              dataEntrada: '15/05/2023',
            },
            {
              quantEntrada: 10,
              dataEntrada: '16/05/2023',
            },
            {
              quantEntrada: 15,
              dataEntrada: '17/05/2023',
            },
            {
              quantEntrada: 10,
              dataEntrada: '18/05/2023',
            },
            {
              quantEntrada: 15,
              dataEntrada: '19/05/2023',
            },
            {
              quantEntrada: 15,
              dataEntrada: '10/06/2023',
            },
          ],
          qtdSaida: [
            {
              quantSaida: 5,
              dataSaida: '10/05/2023',
            },
            {
              quantSaida: 15,
              dataSaida: '11/05/2023',
            },
          ],
          descBreve: 'Descrição breve do MJ 15-30-15',
          descCompleta: 'Descrição completa do produto MJ 15-30-15',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 15-30-15',
          comentariosProduto: [
          {
            comentario: 'Gostei do produto'
          },
          {
            comentario: 'Produto mediano'
          },
          {
            comentario: 'Amei a compra'
          },
          ],
          comentariosPendentes: [
            {
              comentario: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            }
          ]
        },
      ]
    },
  ];

  produtosDestaque: Produtos[] = [
    {
      nome: 'mj-15-30-15',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512.jpg',
            },
          ],
      preco: 1234.10,
      descBreve: 'Descrição breve do MJ 15-30-15',
      descCompleta: 'Descrição completa do MJ 15-30-15',
      especificacaoTecnica: 'Especificação Técnica do MJ 15-30-15',
      comentariosProduto: [
        {
          comentario: 'Gostei do produto'
        },
        {
          comentario: 'Produto mediano'
        },
        {
          comentario: 'Amei a compra'
        }
      ]
    },
  ];

  produtosMaisVendidos: Produtos[] = [
    {
      nome: 'mj-15-30-15',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512.jpg',
            }
          ],
      preco: 1234.10,
      descBreve: 'Descrição breve do MJ 15-30-15',
      descCompleta: 'Descrição completa do MJ 15-30-15',
      especificacaoTecnica: 'Especificação Técnica do MJ 15-30-15',
      comentariosProduto: [
        {
          comentario: 'Gostei do produto'
        },
        {
          comentario: 'Produto mediano'
        },
        {
          comentario: 'Amei a compra'
        }
      ]
    },

  ]

  produtosEmPromocao: Produtos[] = [
    {
      nome: 'mj-15-30-15',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512.jpg',
            }
          ],
      preco: 1234.10,
      descBreve: 'Descrição breve do MJ 15-30-15',
      descCompleta: 'Descrição completa do MJ 15-30-15',
      especificacaoTecnica: 'Especificação Técnica do MJ 15-30-15',
      comentariosProduto: [
        {
          comentario: 'Gostei do produto'
        },
        {
          comentario: 'Produto mediano'
        },
        {
          comentario: 'Amei a compra'
        }
      ]
    },
  ]

  categoriasAPI: Categorias[] = [];

  produtosAPI: Produtos[] = []

  posicaoProdutosAPI: PosicaoProdutos[] = []

  produtosDestaqueAPI: Produtos[] = [];

  produtosMaisVendidosAPI: Produtos[] = [];

  produtosEmPromocaoAPI: Produtos[] = [];

  produtosMocado: Produtos[] = [
    {
      prodId: 0,
      nome: "Teste",
      qtdEntrada: [{
        quantEntrada: 10,
        dataEntrada: "10/10/2023"
      }],
      qtdSaida: [{
        quantSaida: 5,
        dataSaida: "11/10/2023"
      }],
    },
    {
      prodId: 1,
      nome: "Teste1",
    },
    {
      prodId: 2,
      nome: "Teste2",
    },
    {
      prodId: 3,
      nome: "Teste3",
    },
    {
      prodId: 4,
      nome: "Teste4",
    },
    {
      prodId: 5,
      nome: "Teste5",
    },
  ]




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

  obterProdutoPorNome(nome: string): Categorias | undefined {
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
  getProdutosComComentariosPendentes(): Observable<Produtos[]> {
    const produtosComComentariosPendentes = this.categorias.reduce((result, categoria) => {
      return result.concat(
        categoria!.produtos!.filter(produto => produto.comentariosPendentes && produto.comentariosPendentes.length > 0)
      );
    }, [] as Produtos[]);

    return of(produtosComComentariosPendentes);
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
