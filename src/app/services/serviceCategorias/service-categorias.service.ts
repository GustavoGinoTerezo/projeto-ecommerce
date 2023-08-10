import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Categorias {
  nome: string;
  imagem: string;
  icon: string;
  produtos?: Produtos[] ;
}

export interface Produtos {
  id?: number;
  nome?: string;
  imagem?: string;
  preco?: string;
  descricao?: string;
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
      produtos: [{
        nome: 'Teste 1',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria B',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
        imagem: 'assets/logo.png',
      }
      ]
    },
    {
      nome: 'Categoria C',
      icon: 'fa-solid fa-question',
      imagem: 'assets/logo.png',
      produtos: [{
        nome: '',
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
    {nome: 'Produto A', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto A',},
    {nome: 'Produto B', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto B',},
    {nome: 'Produto C', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto C',},
    {nome: 'Produto D', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto D',},
    {nome: 'Produto E', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto E',},
    {nome: 'Produto F', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto F',},
    {nome: 'Produto G', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto G',},
    {nome: 'Produto H', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto H',},
    {nome: 'Produto I', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto I',},
    {nome: 'Produto J', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto J',},
  ];

  produtosMaisVendidos: Produtos[] = [
    {nome: 'Produto Z', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto Z',},
    {nome: 'Produto Z1', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto Z1',},
    {nome: 'Produto Z2', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto Z2',},
    {nome: 'Produto Z3', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto Z3',},
  ]

  produtosEmPromocao: Produtos[] = [
    {nome: 'Produto X', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto X',},
    {nome: 'Produto X1', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto X1',},
    {nome: 'Produto X2', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto X2',},
    {nome: 'Produto X3', imagem: 'assets/logo.png', preco: 'R$ ???,??', descricao: 'Descricao do produto X3',},
  ]


  //==================================================================================================================================//
  //PRODUTOS EM DESTAQUE
  getProdutosDestaque(): Observable<Produtos[]> {
    return of (this.produtosDestaque);
  }

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

  obterProdutoPorNomeEmPromocao(nome: string): Produtos | undefined {
    return this.produtosEmPromocao.find(
      (produto) => produto.nome && produto.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  //==================================================================================================================================//
  getCategorias(): Observable<Categorias[]> {
    return of (this.categorias);
  }

  constructor() { }
}
