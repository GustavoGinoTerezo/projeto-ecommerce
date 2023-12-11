import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceUrlGlobalService {

  url: string = 'https://ecommerce.rhuna.tech:3333/';

  constructor() { }
}
