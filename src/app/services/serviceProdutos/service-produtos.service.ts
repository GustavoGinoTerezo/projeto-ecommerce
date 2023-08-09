import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
export class ServiceProdutosService {

  constructor() { }

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
  ]

  getProdutosDestaque(): Observable<Produtos[]> {
    return of (this.produtosDestaque);
  }
}
