import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Categorias {
  nome?: string;
  imagem?: string;
  icon?: string;
  produtos?: Produtos[] ;
}

export interface Produtos {
  id?: number;
  nome?: string;
  imagem?: Imagens[];
  preco?: string;
  descricaoBreve?: string;
  descricaoCompleta?: string;
  especificacaoTecnica?: string;
  comentariosProduto?: ComentariosProdutos[];
}

export interface ComentariosProdutos{
  id?: string;
  comentario?: string;
}

export interface Imagens{
  imagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriasService {

  categorias: Categorias[] =
  [
    {
      nome: 'Boost',
      icon: 'fa-solid fa-question',
      imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512-12321.jpg',
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
          preco: '???,??',
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
          }
          ]
        },
        {
          nome: 'mj-15-30-15',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-30-15-Boost-10512-12321.jpg',
            }
          ],
          preco: '???,??',
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
          }
          ]
        },
        {
          nome: 'mj-15-30-15',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-US-Boost-15-30-15-12278-12321.jpg',
            }
          ],
          preco: '???,??',
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
          }
          ]
        },
      ]
    },
    {
      nome: 'Grow',
      icon: 'fa-solid fa-question',
      imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251-12319.jpg',
      produtos: [
        {
          nome: 'mj-12-8-26',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 12-8-26',
          descricaoCompleta: 'Descrição completa do produto MJ 12-8-26',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 12-8-26',
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
        {
          nome: 'mj-12-8-26',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251-2.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 12-8-26',
          descricaoCompleta: 'Descrição completa do produto MJ 12-8-26',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 12-8-26',
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
        {
          nome: 'mj-12-8-26',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251-12319.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 12-8-26',
          descricaoCompleta: 'Descrição completa do produto MJ 12-8-26',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 12-8-26',
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
        {
          nome: 'mj-us-12-8-26',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-US-Grow-12-8-26-12279-12319.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ US 12-8-26',
          descricaoCompleta: 'Descrição completa do produto MJ US 12-8-26',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ US 12-8-26',
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
    },
    {
      nome: 'Bloom',
      icon: 'fa-solid fa-question',
      imagem: 'assets/produtos/Plant-Prod-MJ-10-30-20-Bloom-12209-12320-1.jpg',
      produtos: [
        {
          nome: 'mj-10-30-20',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-10-30-20-Bloom-12209-12320-1.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 10-30-20',
          descricaoCompleta: 'Descrição completa do produto MJ 10-30-20',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 10-30-20',
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
    },
    {
      nome: 'Finisher',
      icon: 'fa-solid fa-question',
      imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg',
      produtos: [
        {
          nome: 'mj-10-30-20',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 4-31-37',
          descricaoCompleta: 'Descrição completa do produto MJ 4-31-37',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 4-31-37',
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
        {
          nome: 'mj-10-30-20',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 4-31-37',
          descricaoCompleta: 'Descrição completa do produto MJ 4-31-37',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 4-31-37',
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
        {
          nome: 'mj-10-30-20',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255-12323-1.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 4-31-37',
          descricaoCompleta: 'Descrição completa do produto MJ 4-31-37',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 4-31-37',
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
    },
    {
      nome: 'Cal Kick',
      icon: 'fa-solid fa-question',
      imagem: 'assets/produtos/Plant-Prod-MJ-15-0-14-Cal-Kick-12256.jpg',
      produtos: [
        {
          nome: 'mj-15-0-14',
          imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-0-14-Cal-Kick-12256.jpg',
            }
          ],
          preco: '???,??',
          descricaoBreve: 'Descrição breve do MJ 15-0-14',
          descricaoCompleta: 'Descrição completa do produto MJ 15-0-14',
          especificacaoTecnica: 'Especificação Técnica do Produto MJ 15-0-14',
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
      preco: '???,??',
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
    {
      nome: 'mj-12-8-26',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 12-8-26',
      descricaoCompleta: 'Descrição completa do MJ 12-8-26',
      especificacaoTecnica: 'Especificação Técnica do MJ 12-8-26',
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
    {
      nome: 'mj-10-30-20',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-10-30-20-Bloom-12209-12320-1.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-4-31-37',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 4-31-37',
      descricaoCompleta: 'Descrição completa do MJ 4-31-37',
      especificacaoTecnica: 'Especificação Técnica do MJ 4-31-37',
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
    {
      nome: 'mj-15-0-14',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-0-14-Cal-Kick-12256.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
      preco: '???,??',
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
    {
      nome: 'mj-12-8-26',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 12-8-26',
      descricaoCompleta: 'Descrição completa do MJ 12-8-26',
      especificacaoTecnica: 'Especificação Técnica do MJ 12-8-26',
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
    {
      nome: 'mj-10-30-20',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-10-30-20-Bloom-12209-12320-1.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-10-30-20',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-15-0-14',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-0-14-Cal-Kick-12256.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
      preco: '???,??',
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
    {
      nome: 'mj-12-8-26',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-12-8-26-Grow-12251.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 12-8-26',
      descricaoCompleta: 'Descrição completa do MJ 12-8-26',
      especificacaoTecnica: 'Especificação Técnica do MJ 12-8-26',
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
    {
      nome: 'mj-10-30-20',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-10-30-20-Bloom-12209-12320-1.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-10-30-20',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-15-0-14',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-0-14-Cal-Kick-12256.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-10-30-20',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-4-31-37-Finisher-12255.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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
    {
      nome: 'mj-15-0-14',
      imagem: [
            {
              imagem: 'assets/produtos/Plant-Prod-MJ-15-0-14-Cal-Kick-12256.jpg',
            }
          ],
      preco: '???,??',
      descricaoBreve: 'Descrição breve do MJ 10-30-20',
      descricaoCompleta: 'Descrição completa do MJ 10-30-20',
      especificacaoTecnica: 'Especificação Técnica do MJ 10-30-20',
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

  //==================================================================================================================================//

  getCategorias(): Observable<Categorias[]> {
    return of (this.categorias);
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

  constructor() { }
}
