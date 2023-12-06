import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ServiceUsuarioLogadoService } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiEnderecosService } from 'src/app/services/servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';
import { ServiceApiLoginService } from 'src/app/services/servicesAPI/serviceAPI-Login/service-api-login.service';
import { ServiceApiUsuarioLogadoService } from 'src/app/services/servicesAPI/serviceAPI-UsuarioLogado/service-api-usuario-logado.service';
import { AES } from 'crypto-ts';
import { ServiceAPIRedefinirSenhaService } from 'src/app/services/servicesAPI/serviceAPI-RedefinirSenha/service-api-redefinir-senha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailLogin!: string;
  emailRedefinicao!: string;
  passwordLogin!: string;
  checked: boolean = false;
  visibleTrocarSenha: boolean = false;
  visibleRedefinirSenha: boolean = true;
  novaSenha!: string;
  token!: string;

  constructor(
    private loginService: ServiceApiLoginService,
    private router: Router,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    private usuarioLogadoService: ServiceUsuarioLogadoService,
    private ativarLateralService: AppComponent,
    private serviceRedefinirSenha: ServiceAPIRedefinirSenhaService,
    private apiEnderecos: ServiceApiEnderecosService,
    private appToast: AppComponent,
    private apiUsuarioLogado: ServiceApiUsuarioLogadoService,
    private usuarioLogado: ServiceUsuarioLogadoService,
  ){}

  entrar(){

    const dataLogin = {
      emailprinc: this.emailLogin,
      senha: this.passwordLogin
    }

    this.loginService.logar(dataLogin).subscribe(response => {

      try {
        const ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee = '3a5fcd67e16707188a6dd213303761fd530fed07434b8641044460fd9fdde581';

        const a4e21fcb21ced0f0bf2b03794e2dd121ad1d6e780749f413985b40b416e34dd1 = 'c6cac15e687c642f42ac6259a8a9fbb12fb6f33b8c72c1491c20d3f539ba3992';

        const b902d003e9c8fd435794396aa9dd3a985d4ffc3d3147338dc9b9297e78ab8f31 = 'c9a8113cc37af17ec4e32a9c77ac9afffb417a3af2a1a88154f0fd71a553fd51';

        // Valores a serem criptografados
        const loginId = response.LoginId.toString();
        const tpUsuario = response.tpusuario.toString();
        const accessToken = response.access_token.toString();

        // Certifique-se de que os valores não estão vazios antes de criptografar
        if (loginId && tpUsuario && accessToken) {
          // Criptografar os valores
          const e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01 = AES.encrypt(loginId, ef88b713413e01ff4fc0a3ccb4037c9e5e0f864915876375ef66eef5801e1bee).toString();

          const bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601 = AES.encrypt(tpUsuario, a4e21fcb21ced0f0bf2b03794e2dd121ad1d6e780749f413985b40b416e34dd1).toString();

          const d34c262a8352a8af80188c4b5415df1319ceddd602a0147cd3077d0ca7e6dc35 = AES.encrypt(accessToken, b902d003e9c8fd435794396aa9dd3a985d4ffc3d3147338dc9b9297e78ab8f31).toString();

          // Armazenar os valores criptografados no sessionStorage
          sessionStorage.setItem('u', e3ab87bbcb7de65067ed3f1fa313aa98b10ee3e1b3f6d6240170508e2ff9df01);

          sessionStorage.setItem('t', bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601);

          sessionStorage.setItem('at', d34c262a8352a8af80188c4b5415df1319ceddd602a0147cd3077d0ca7e6dc35);

          this.usuarioLogado.atualizarEnderecoUsuarioLogadoAPI()
          this.usuarioLogado.atualizarTelefonesUsuarioLogadoAPI()
          this.usuarioLogado.atualizarUsuarioAPI()

          // ====================================================================================== //
          // CONTROLE DE ACESSO //

          if(response){
            if(response.tpusuario === "0"){
              this.router.navigateByUrl('/tela-principal'); //navegação para a tela principal
              this.mostrarLateraisService.setMostrarLateralUsuario(true);
              this.ativarLateralService.ativarLateral();
              this.usuarioLogadoService.atualizarMostrarBotaoLogin(false);

            } else if (response.tpusuario === "1") {
              this.router.navigateByUrl('/tela-principal'); //navegação para a tela principal
              this.mostrarLateraisService.setMostrarLateralAdministrador(true);
              this.mostrarLateraisService.setMostrarLateralUsuario(true);
              this.ativarLateralService.ativarLateral();
              this.usuarioLogadoService.atualizarMostrarBotaoLogin(false);
            }
          }
        } else {
          console.error('Um ou mais valores de entrada estão vazios ou não são strings.');
        }
      } catch (error) {
        console.error('Erro de criptografia:', error);
      }
    },
    (error) => {
      console.log("Email ou senha inválidos", error)
    });
  }

  trocarSenha(){
    this.visibleTrocarSenha = true;
  }

  redefinirSenha(){
    this.visibleTrocarSenha = false;
    this.visibleRedefinirSenha = true;

    const email = {
      emailprinc: this.emailRedefinicao
    }

    this.serviceRedefinirSenha.solicitarRedefinirSenha(email).subscribe((response) => {
      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Token de redefinição de senha enviado para o email'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    },
    (error) => {
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro ao enviar o token para o email'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    })

  }

  alterarSenha(){

    const dataNovaSenha = {
      email: this.emailRedefinicao,
      token: this.token,
      novaSenha: this.novaSenha
    }

    this.serviceRedefinirSenha.alterarSenha(dataNovaSenha).subscribe((response) => {
      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Senha alterada com sucesso'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    },
    (error) => {
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro alterar a senha'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    })

  }

  navigateCriarConta(){
    this.router.navigate(['/criar-conta']);
  }

  senhaValida(): boolean {
    // Verifica se a senha atende ao regex
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(this.novaSenha);
  }
}
