import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCategoriasService } from './services/serviceCategorias/service-categorias.service';
import { ServiceUsuarioLogadoService } from './services/serviceUsuarioLogado/service-usuario-logado.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { MenuItem, MessageService } from 'primeng/api';
import { ServiceBannerService } from './services/serviceBanner/service-banner.service';
import { Subscription, concatMap } from 'rxjs';
import { ServiceColorPickerService } from './services/serviceColorPicker/service-color-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private subscriptions: Subscription[] = [];

  mostrarLateralUsuario: boolean = true;
  mostrarLateralAdministrador: boolean = true;

  menuItems: MenuItem[] = [];
  menuItemsAdmin: MenuItem[] = []

  coresAPI: any = {} as any;

  constructor(
    private router: Router,
    private categoriasService: ServiceCategoriasService,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    private bannersService: ServiceBannerService,
    private usuarioLogado: ServiceUsuarioLogadoService,
    private colorService: ServiceColorPickerService,
    private messageService: MessageService,
  ) {}

  async ngOnInit(){

    // this.categoriasService.atualizarCategoriasDaAPI();

    this.colorService.buscarCoresDaAPI()
      .then(() => {
        return this.colorService.getCores().toPromise();
      })
      .then((coresAPI) => {
        if (coresAPI !== undefined && coresAPI.length > 0) {
          const cores = JSON.parse(coresAPI[0].cor) as any;

          this.colorService.atualizarTon1(cores.cor1);
          this.colorService.atualizarTon2(cores.cor2);
          this.colorService.atualizarTon3(cores.cor3);
          this.colorService.atualizarTon4(cores.cor4);
          this.colorService.atualizarTon5(cores.cor5);
          this.colorService.atualizarTon6(cores.cor6);
          this.colorService.atualizarTon7(cores.cor7);
          this.colorService.atualizarTon8(cores.cor8);
          this.colorService.atualizarTon9(cores.cor9);
          this.colorService.atualizarTon10(cores.cor10);
          this.colorService.atualizarTon11(cores.cor11);

        } else {
          console.error("getCores retornou undefined");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar cores da API:", error);
      });

    // this.bannersService.atualizarBannerDaAPI();

    // this.usuarioLogado.atualizarEnderecoUsuarioLogadoAPI()

    // this.usuarioLogado.atualizarTelefonesUsuarioLogadoAPI()

    // this.usuarioLogado.atualizarUsuarioAPI();

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

    // ========================================================================================
    // FUNCIONALIDADES RELACIONADAS A PERSONALIZAÇÃO DAS CORES


    this.subscriptions.push(this.colorService.ton1$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton2$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--header-rodape', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton3$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--scrollbar', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton4$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--textos-e-icones-botoes', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton5$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background-botoes', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton6$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--hover-background-botoes', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton7$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--container-externo-cards-produtos', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton8$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--container-interno-cards-produtos', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton9$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--borda-dos-containers', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton10$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--background-das-divs-da-categoria', novaCor);
    }));

    this.subscriptions.push(this.colorService.ton11$.subscribe(novaCor => {
      const estilo = document.documentElement.style;
      estilo.setProperty('--cor-valor-total', novaCor);
    }));

  }

// ====================================================================================== //
// CONTROLE DE ACESSO //

  ngOnDestroy(){

    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }

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
    sessionStorage.removeItem('q')
    sessionStorage.removeItem('rd')

  }
}
