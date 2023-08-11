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
  imagem?: string;
  preco?: string;
  descricaoBreve?: string;
  descricaoCompleta?: string;
  especificacaoTecnica?: string;
  comentariosProduto?: [
    {
      id?: string;
      comentario?: string;
    },
    {
      id?: string;
      comentario?: string;
    },
    {
      id?: string;
      comentario?: string;
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriasService {

  categorias: Categorias[] =
  [
    {
      nome: 'Categoria A',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [
        {
          nome: 'Teste 1',
          imagem: 'assets/logo.png',
        },
        {
          nome: 'Teste 1',
          imagem: 'assets/logo.png',
        },
        {
          nome: 'Teste 1',
          imagem: 'assets/logo.png',
        },
      ]
    },
    {
      nome: 'Categoria B',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: 'Teste 2',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria C',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: 'Teste 3',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria D',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria E',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria F',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria G',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria H',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria I',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria J',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria K',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria L',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria M',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria N',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria O',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria P',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria Q',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria R',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria S',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria T',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },

  ];

  produtosDestaque: Produtos[] = [
    {nome: 'Produto A', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto A', descricaoCompleta: 'Descrição completa do produto A', especificacaoTecnica: 'Especificação Técnica do Produto A', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto B', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto B', descricaoCompleta: 'Descrição completa do produto B', especificacaoTecnica: 'Especificação Técnica do Produto B', comentariosProduto: [{ comentario: 'Não gostei do produto' }, { comentario: 'Produto mais ou menos' }, { comentario: 'Normal a compra' }]},
    {nome: 'Produto C', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto C', descricaoCompleta: 'Descrição completa do produto C', especificacaoTecnica: 'Especificação Técnica do Produto C' },
    {nome: 'Produto D', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto D', descricaoCompleta: 'Descrição completa do produto D', especificacaoTecnica: 'Especificação Técnica do Produto D', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto E', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto E', descricaoCompleta: 'Descrição completa do produto E', especificacaoTecnica: 'Especificação Técnica do Produto E', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto F', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto F', descricaoCompleta: 'Descrição completa do produto F', especificacaoTecnica: 'Especificação Técnica do Produto F', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto G', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto G', descricaoCompleta: 'Descrição completa do produto G', especificacaoTecnica: 'Especificação Técnica do Produto G', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto H', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto H', descricaoCompleta: 'Descrição completa do produto H', especificacaoTecnica: 'Especificação Técnica do Produto H', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
  ];

  produtosMaisVendidos: Produtos[] = [
    {nome: 'Produto I', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto I', descricaoCompleta: 'Descrição completa do produto I', especificacaoTecnica: 'Especificação Técnica do Produto I', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto J', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto J', descricaoCompleta: 'Descrição completa do produto J', especificacaoTecnica: 'Especificação Técnica do Produto J', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto K', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto K', descricaoCompleta: 'Descrição completa do produto K', especificacaoTecnica: 'Especificação Técnica do Produto K', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto L', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto L', descricaoCompleta: 'Descrição completa do produto L', especificacaoTecnica: 'Especificação Técnica do Produto L', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto M', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto M', descricaoCompleta: 'Descrição completa do produto M', especificacaoTecnica: 'Especificação Técnica do Produto M', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto N', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto N', descricaoCompleta: 'Descrição completa do produto N', especificacaoTecnica: 'Especificação Técnica do Produto N', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto O', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto O', descricaoCompleta: 'Descrição completa do produto O', especificacaoTecnica: 'Especificação Técnica do Produto O', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto P', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto P', descricaoCompleta: 'Descrição completa do produto P', especificacaoTecnica: 'Especificação Técnica do Produto P', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
  ]

  produtosEmPromocao: Produtos[] = [
    {nome: 'Produto Q', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto Q', descricaoCompleta: 'Descrição completa do produto Q', especificacaoTecnica: 'Especificação Técnica do Produto A', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto R', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto R', descricaoCompleta: 'Descrição completa do produto R', especificacaoTecnica: 'Especificação Técnica do Produto R', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto S', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto S', descricaoCompleta: 'Descrição completa do produto S', especificacaoTecnica: 'Especificação Técnica do Produto S', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
    {nome: 'Produto T', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricaoBreve: 'Descrição breve do produto T', descricaoCompleta: 'Descrição completa do produto T', especificacaoTecnica: 'Especificação Técnica do Produto T', comentariosProduto: [{ comentario: 'Gostei do produto' }, { comentario: 'Produto mediano' }, { comentario: 'Amei a compra' }]},
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

  //==================================================================================================================================//

  constructor() { }
}
