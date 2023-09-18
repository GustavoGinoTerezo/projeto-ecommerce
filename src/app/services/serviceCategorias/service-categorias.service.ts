import { Injectable, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ServiceAPICategoriaService } from '../servicesAPI/serviceAPI-Categoria/service-api-categoria.service';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlGlobalService } from '../servicesAPI/serviceUrlGlobal/service-url-global.service';
import { ServiceAPIProdutoService } from '../servicesAPI/serviceAPI-Produto/service-api-produto.service';

export interface CategoriaVazia extends Categorias {
  nome: '';
}

export interface Categorias {
  nome?: string;
  produtos?: Produtos[] ;
}

export interface Produtos {
  id?: number;
  nome?: string;
  imagem?: Imagens[];
  preco?: number;
  status?: Status[];
  quantEntrada?: Entrada[];
  quantSaida?: Saida[];
  descricaoBreve?: string;
  descricaoCompleta?: string;
  especificacaoTecnica?: string;
  comentariosProduto?: ComentariosProdutos[];
  comentariosPendentes?: ComentariosProdutos[];
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
          quantEntrada: [
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
          quantSaida: [
            {
              quantSaida: 5,
              dataSaida: '10/05/2023',
            },
            {
              quantSaida: 15,
              dataSaida: '11/05/2023',
            },
          ],
          descricaoBreve: 'Descrição breve do MJ 15-30-15',
          descricaoCompleta: 'Descrição completa do produto MJ 15-30-15',
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
      descricaoBreve: 'Descrição breve do MJ 15-30-15',
      descricaoCompleta: 'Descrição completa do MJ 15-30-15',
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
      descricaoBreve: 'Descrição breve do MJ 15-30-15',
      descricaoCompleta: 'Descrição completa do MJ 15-30-15',
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
      descricaoBreve: 'Descrição breve do MJ 15-30-15',
      descricaoCompleta: 'Descrição completa do MJ 15-30-15',
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

  //==================================================================================================================================//

  getCategorias(): Observable<Categorias[]> {
    return of (this.categorias);
  }

  getCategoriasTabela() {
    return Promise.resolve(this.produtosAPI);
  }

  obterCategoriaPorNome(nome: string): Categorias | undefined {
    return this.categorias.find(
      (categoria) => categoria.nome && categoria.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  //PRODUTOS EM DESTAQUE
  getProdutosDestaque(): Observable<Produtos[]> {
    return of (this.produtosDestaque);
  }

  //MUDAR A URL COM O NOME DO PRODUTO
  obterProdutoPorNomeDestaque(nome: string): Produtos | undefined {
    return this.produtosDestaque.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  //PRODUTOS MAIS VENDIDOS
  getProdutosMaisVendidos(): Observable<Produtos[]> {
    return of (this.produtosMaisVendidos);
  }

  //MUDAR A URL COM O NOME DO PRODUTO
  obterProdutoPorNomeMaisVendidos(nome: string): Produtos | undefined {
    return this.produtosMaisVendidos.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  //PRODUTOS MAIS VENDIDOS
  getProdutosEmPromocao(): Observable<Produtos[]> {
    return of (this.produtosEmPromocao);
  }

  //MUDAR A URL COM O NOME DO PRODUTO
  obterProdutoPorNomeEmPromocao(nome: string): Produtos | undefined {
    return this.produtosEmPromocao.find(
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

  atualizarCategoriasDaAPI() {
    this.apiCategoriaService.buscarCategorias().subscribe(
      (categoriasAPI) => {
        this.categoriasAPI = categoriasAPI;
        console.log(this.categoriasAPI)
      },
      (error) => {
        console.error('Erro ao buscar categorias da API', error);
      }
    );
  }

  atualizarProdutosDaAPI(){
    this.apiProdutos.buscarProdutos().subscribe(
      (produtosAPI) => {
        this.produtosAPI = produtosAPI;
        console.log(this.produtosAPI)
      },
      (error) => {
        console.error('Erro ao buscar categorias da API', error);
      }
    );
  }

}
