import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ServiceCarrinhoDeComprasService } from '../services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';

@Injectable({
  providedIn: 'root'
})
export class GuardaRotaCarrinho {
  
    constructor(
        private carrinhoEstadoService: ServiceCarrinhoDeComprasService,
        private router: Router
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Verifique se o usuário passou pela tela 'carrinho-de-compra'
        const carrinhoDeCompraVisited = this.carrinhoEstadoService.isCarrinhoVisitado();
    
        if (carrinhoDeCompraVisited) {
            return true; // Permite o acesso à rota
        } else {
            // Navegue de volta para a tela 'carrinho-de-compra' se não tiver passado por ela
            this.router.navigate(['/carrinho-de-compra']);
            return false; // Impede o acesso à rota atual
        }
    }
    

}
