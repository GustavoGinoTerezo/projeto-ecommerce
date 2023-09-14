import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceUrlGlobalService {

  url: string = 'https://defiant-gown-bear.cyclic.cloud/';

  constructor() { }
}
