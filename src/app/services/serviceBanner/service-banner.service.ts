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
      imagem: 'assets/logo.png'
    },
    {
      imagem: 'https://i.pinimg.com/originals/b8/00/f5/b800f523231e10f4fc8af784e8ef4711.jpg'
    },
]

constructor() { }

  getImages(): Observable<Banner[]> {
    return of (this.banner);
  }
}
