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
      imagem: 'assets/anuncios/anuncio1.png'
    },
    {
      imagem: 'assets/anuncios/anuncio2.png'
    },
  ]

  anuncioMenor: Anuncios[] = [
    {
      imagem: 'assets/anuncios/anuncio3.png'
    },
    {
      imagem: 'assets/anuncios/anuncio4.png'
    },
    {
      imagem: 'assets/anuncios/anuncio5.png'
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
