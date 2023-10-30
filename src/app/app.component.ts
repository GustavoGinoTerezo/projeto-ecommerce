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

  constructor(
    private router: Router,
    private categoriasService: ServiceCategoriasService,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    private usuarioLogado: ServiceUsuarioLogadoService,
    private messageService: MessageService,
  ) {}

  tipo!: string;

  async ngOnInit(){

    // this.categoriasService.atualizarCategoriasDaAPI();

    // this.usuarioLogado.atualizarEnderecoUsuarioLogadoAPI()

    // this.usuarioLogado.atualizarTelefonesUsuarioLogadoAPI()

    // this.usuarioLogado.atualizarUsuarioAPI();

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
 
}
