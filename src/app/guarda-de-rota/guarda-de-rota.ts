import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardaRotaUsuario {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifique se o token está presente no sessionStorage
    const authToken = sessionStorage.getItem('at');

    if (authToken) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']); // Redireciona para a tela de login se o token não estiver presente
      return false; // Não permite o acesso à rota
    }
  }
}
