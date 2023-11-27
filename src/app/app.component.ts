import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCategoriasService } from './services/serviceCategorias/service-categorias.service';
import { ServiceUsuarioLogadoService } from './services/serviceUsuarioLogado/service-usuario-logado.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  mostrarLateralUsuario: boolean = true;
  mostrarLateralAdministrador: boolean = true;

  menuItems: MenuItem[] = [];
  menuItemsAdmin: MenuItem[] = []

  constructor(
    private router: Router,
    private categoriasService: ServiceCategoriasService,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    private usuarioLogado: ServiceUsuarioLogadoService,
    private messageService: MessageService,
  ) {}

  tipo!: string;

  async ngOnInit(){

    this.categoriasService.atualizarCategoriasDaAPI();

    this.usuarioLogado.atualizarEnderecoUsuarioLogadoAPI()

    this.usuarioLogado.atualizarTelefonesUsuarioLogadoAPI()

    this.usuarioLogado.atualizarUsuarioAPI();

    this.menuItems = [
      {
        label: 'Minha conta',
        routerLink: 'minha-conta',
      },
      {
        label: 'Meus dados',
        routerLink: 'meus-dados',
      },
      {
        label: 'Meus pedidos',
        routerLink: 'meus-pedidos',
      },
      {
        label: 'Logout',
        command: () => this.logout(),
      },
    ]

    this.menuItemsAdmin = [
      {
        routerLink: 'gerenciamento-de-clientes',
        label: 'Gerenciamento de Clientes',
      },
      {
        routerLink: 'gerenciamento-de-categorias-e-produtos',
        label: 'Gerenciamento de Categorias e Produtos',
      },
      {
        routerLink: 'gerenciamento-de-estoque',
        label: 'Gerenciamento de Estoque',
      },
      {
        routerLink: 'gerenciamento-de-estados',
        label: 'Gerenciamento de Estados',
      },
      {
        routerLink: 'gerenciamento-de-comentarios',
        label: 'Gerenciamento de Comentários',
      },
      {
        routerLink: 'gerenciamento-de-caixas',
        label: 'Gerenciamento de Caixas',
      },
      {
        routerLink: 'gerenciamento-de-fornecedores',
        label: 'Gerenciamento de Fornecedores',
      },
      {
        routerLink: 'relatorio-de-vendas-e-controle-de-pedidos',
        label: 'Relatório de Vendas e Controle de Pedidos',
      },
      {
        routerLink: 'personalizacao',
        label: 'Personalização',
      },
      
    ]

    this.ativarLateral();

  }

// ====================================================================================== //
// CONTROLE DE ACESSO //

  ativarLateral() {

    const a4e21fcb21ced0f0bf2b03794e2dd121ad1d6e780749f413985b40b416e34dd1 = 'c6cac15e687c642f42ac6259a8a9fbb12fb6f33b8c72c1491c20d3f539ba3992';

    const bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601 = sessionStorage.getItem('t');

    if (bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601) {
      const f63694ef33b2bbd387c5399a54d2e5eb062d27e2a1518d0b0cae6c65c39f805a = CryptoJS.AES.decrypt(bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601, a4e21fcb21ced0f0bf2b03794e2dd121ad1d6e780749f413985b40b416e34dd1);

      // Verifique se a descriptografia foi bem-sucedida
      if (f63694ef33b2bbd387c5399a54d2e5eb062d27e2a1518d0b0cae6c65c39f805a.sigBytes > 0) {
        const tpUsuario = parseInt(f63694ef33b2bbd387c5399a54d2e5eb062d27e2a1518d0b0cae6c65c39f805a.toString(CryptoJS.enc.Utf8), 10); // Converta para número

        // Verifique se this.mostrarLateraisService não é nulo
        if (this.mostrarLateraisService) {
          if (tpUsuario === 0) { // Agora compare com números em vez de strings
            this.mostrarLateraisService.getMostrarLateralUsuario().subscribe((value: boolean) => {
              this.mostrarLateralUsuario = value;
            });
          } else if (tpUsuario === 1) { // Agora compare com números em vez de strings
            this.mostrarLateraisService.getMostrarLateralAdministrador().subscribe((value: boolean) => {
              this.mostrarLateralAdministrador = value;
            });
            this.mostrarLateraisService.getMostrarLateralUsuario().subscribe((value: boolean) => {
              this.mostrarLateralUsuario = value;
            });
          }
        }
      }
    }
  }

// ====================================================================================== //

  acaoDoBotao() {
    window.open('https://api.whatsapp.com/send?phone=5519989937300', '_blank');
  }

  toast( tipo: string, titulo: string, mensagem: string, icon: string ) {
    this.messageService.add({ severity: tipo, summary: titulo, detail: mensagem, icon: icon });
  }
 
  logout() {
    this.router.navigate(['/tela-principal']);
    this.mostrarLateraisService.setMostrarLateralUsuario(false);
    this.mostrarLateraisService.setMostrarLateralAdministrador(false);

    sessionStorage.removeItem('t')
    sessionStorage.removeItem('u')
    sessionStorage.removeItem('c')
    sessionStorage.removeItem('lu')
    sessionStorage.removeItem('la')
    sessionStorage.removeItem('p')
    sessionStorage.removeItem('at')
    sessionStorage.removeItem('es')
    sessionStorage.removeItem('startEnderecos')
    sessionStorage.removeItem('startUser')

  }
}
