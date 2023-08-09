import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produtos } from '../serviceProdutos/service-produtos.service';

export interface Categorias {
  nome: string;
  imagem: string;
  icon: string;
  produtos?: Produtos[] ;
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

  constructor() { }

  getCategorias(): Observable<Categorias[]> {
    return of (this.categorias);
  }
}
