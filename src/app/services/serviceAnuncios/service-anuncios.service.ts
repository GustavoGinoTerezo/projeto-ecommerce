import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Anuncios {
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceAnunciosService {

  anuncioMaior: Anuncios[] = [
    {
      imagem: 'https://www.maisdinheiro.net/wp-content/uploads/2009/06/anuncio-que-vende.jpg'
    },
    {
      imagem: 'https://www.maisdinheiro.net/wp-content/uploads/2009/06/anuncio-que-vende.jpg'
    },
  ]

  anuncioMenor: Anuncios[] = [
    {
      imagem: 'https://www.maisdinheiro.net/wp-content/uploads/2009/06/anuncio-que-vende.jpg'
    },
    {
      imagem: 'https://www.maisdinheiro.net/wp-content/uploads/2009/06/anuncio-que-vende.jpg'
    },
    {
      imagem: 'https://www.maisdinheiro.net/wp-content/uploads/2009/06/anuncio-que-vende.jpg'
    },
  ]


  constructor() { }

  getAnunciosMaiores(): Observable<Anuncios[]> {
    return of (this.anuncioMaior);
  }

  getAnunciosMenores(): Observable<Anuncios[]> {
    return of (this.anuncioMenor);
  }
}
