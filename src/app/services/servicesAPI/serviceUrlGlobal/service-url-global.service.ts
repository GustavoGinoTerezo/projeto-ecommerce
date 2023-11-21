import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceUrlGlobalService {

  url: string = 'http://62.72.1.71:3333/';

  constructor() { }
}
