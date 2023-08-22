import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent {

  informacaoUsuario: Usuario[] = []

  constructor(
    private usuario: ServiceUsuarioLogadoService,
    private router: Router
  ){}

    ngOnInit(){

      this.informacaoUsuario = this.usuario.getUsuario();

    }

    navigateTodosOsPedido(){
      this.router.navigate(["/meus-pedidos"])
    }

    navigateMeusDados(){
      this.router.navigate(["/meus-dados"])
    }
}
