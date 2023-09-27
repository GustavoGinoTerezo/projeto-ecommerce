import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCategoriasService } from './services/serviceCategorias/service-categorias.service';
import { ServiceUsuarioLogadoService } from './services/serviceUsuarioLogado/service-usuario-logado.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  usuario: boolean = false;
  administrador: boolean = false;

  mostrarLateralUsuario: boolean = false;
  mostrarLateralAdministrador: boolean = false;

  constructor(
    private router: Router,
    private categoriasService: ServiceCategoriasService,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    private usuarioLogado: ServiceUsuarioLogadoService,
  ) {}

  ngOnInit(){

    this.categoriasService.atualizarCategoriasDaAPI();

    this.usuarioLogado.atualizarEnderecoUsuarioLogadoAPI()

    this.usuarioLogado.atualizarTelefonesUsuarioLogadoAPI()

    this.ativarLateral();

  }


// ====================================================================================== //
// CONTROLE DE ACESSO //

ativarLateral() {
  // Chave secreta usada para criptografia (a mesma chave que você usou para criptografar)
  const secretKeytpUsuario = 'tpUsuario';

  // Valor criptografado recuperado do sessionStorage
  const encryptedTpUsuario = sessionStorage.getItem('t');

  // Verifique se o valor criptografado existe e, em seguida, faça a descriptografia
  if (encryptedTpUsuario) {
    const decryptedTpUsuario = CryptoJS.AES.decrypt(encryptedTpUsuario, secretKeytpUsuario);

    // Verifique se a descriptografia foi bem-sucedida
    if (decryptedTpUsuario.sigBytes > 0) {
      const tpUsuario = parseInt(decryptedTpUsuario.toString(CryptoJS.enc.Utf8), 10); // Converta para número

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

  // SESSIONSTORAGE VARIÁVEIS

  // t - tpCadastro
  // c - array com os ids dos produtos para o carrinho
  // u - idUsuario
  // lu - lateral user
  // la - lateral admin
  // p - forma de pagamento

}
