import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Banner {
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceBannerService {

  banner: Banner[] = [
    {
      imagem: 'assets/produtos/Marijuana-bud_logo.jpg'
    },
    {
      imagem: 'assets/produtos/Cannabis_Farming.jpg'
    },
]

constructor() { }

  getImages(): Observable<Banner[]> {
    return of (this.banner);
  }
}
