import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceUrlGlobalService {

  url: string = 'https://plum-important-adder.cyclic.app/';

  constructor() { }
}
