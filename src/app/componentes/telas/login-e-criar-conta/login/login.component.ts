import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ServiceUsuarioLogadoService } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiEnderecosService } from 'src/app/services/servicesAPI/serviceAPI-Enderecos/service-api-enderecos.service';
import { ServiceApiLoginService } from 'src/app/services/servicesAPI/serviceAPI-Login/service-api-login.service';
import { ServiceApiUsuarioLogadoService } from 'src/app/services/servicesAPI/serviceAPI-UsuarioLogado/service-api-usuario-logado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailLogin!: string;
  passwordLogin!: string;
  checked: boolean = false;

  constructor(
    private loginService: ServiceApiLoginService,
    private router: Router,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    private ativarLateralService: AppComponent,
    private apiEnderecos: ServiceApiEnderecosService,
    private apiUsuarioLogado: ServiceApiUsuarioLogadoService,
    private usuarioLogado: ServiceUsuarioLogadoService,
  ){}

  entrar(){

    const dataLogin = {
      emailprinc: this.emailLogin,
      senha: this.passwordLogin
    }

    this.loginService.logar(dataLogin).subscribe(response => {

      sessionStorage.setItem('u', response.LoginId)
      sessionStorage.setItem('t', response.tpusuario)

      this.usuarioLogado.atualizarEnderecoUsuarioLogadoAPI()
      this.usuarioLogado.atualizarTelefoneUsuarioLogadoAPI()

    // ====================================================================================== //
    // CONTROLE DE ACESSO //

      if(response){
        if(response.tpusuario === "0"){
          this.router.navigateByUrl('/tela-principal'); //navegação para a tela principal
          this.mostrarLateraisService.setMostrarLateralUsuario(true);
          this.ativarLateralService.ativarLateral();

        } else if (response.tpusuario === "1") {
          this.router.navigateByUrl('/tela-principal'); //navegação para a tela principal
          this.mostrarLateraisService.setMostrarLateralAdministrador(true);
          this.mostrarLateraisService.setMostrarLateralUsuario(true);
          this.ativarLateralService.ativarLateral();
        }
      }
    },
    (error) => {
      console.log("Email ou senha inválidos", error)
    });
  }


}
