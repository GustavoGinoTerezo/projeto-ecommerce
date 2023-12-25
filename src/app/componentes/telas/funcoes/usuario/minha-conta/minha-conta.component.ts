import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AES } from 'crypto-ts';
import { ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiUsuarioLogadoService } from 'src/app/services/servicesAPI/serviceAPI-UsuarioLogado/service-api-usuario-logado.service';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})

export class MinhaContaComponent implements OnInit, OnDestroy {

  private usuarioSubscription!: Subscription;
  private inicializacaoUserConcluidaSubject!: Subscription;

  usuarioLogadoAPI: any[] = []

  constructor(
    private router: Router,
    private usuarioService: ServiceUsuarioLogadoService,
  ){}

  async ngOnInit(){

    const startUser = sessionStorage.getItem('startUser')

    if(startUser){
      this.carregarUsuario();
    } else {
      const inicializacaoConcluidaObservable = this.usuarioService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoUserConcluidaSubject = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarUsuario();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('startUser');
    });

  }

  ngOnDestroy() {

    if (this.inicializacaoUserConcluidaSubject) {
      this.inicializacaoUserConcluidaSubject.unsubscribe();
    }

    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }

  }

  carregarUsuario() {
    this.usuarioSubscription = this.usuarioService.getUsuario().subscribe((usuarioAPI) => {
      this.usuarioLogadoAPI = [usuarioAPI];
    });
  }
    
  navigateTodosOsPedido() {
    this.router.navigate(["/meus-pedidos"])
  }
  
  navigateMeusDados(){
    this.router.navigate(["/meus-dados"])
  }
}


