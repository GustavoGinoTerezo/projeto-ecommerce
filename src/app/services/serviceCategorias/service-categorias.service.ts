import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Categorias {
  nome: string;
  imagem: string;
  icon: string;
  produtos?: Categorias[] ;
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
          icon: 'fa-solid fa-question',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
        icon:'',
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
      icon:'',
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
      icon:'',
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
      icon:'',
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
        icon:'',
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
      icon:'',
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
      icon:'',
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
      icon:'',
    }
    ]
    },

];

  constructor() { }

  getCategorias(): Observable<Categorias[]> {
    return of (this.categorias);
  }
}
