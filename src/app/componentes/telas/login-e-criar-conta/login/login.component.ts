import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ServiceUsuarioLogadoService } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceApiLoginService } from 'src/app/services/servicesAPI/serviceAPI-Login/service-api-login.service';

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
  ){}

  entrar(){

    const dataLogin = {
      emailprinc: this.emailLogin,
      senha: this.passwordLogin
    }

    this.loginService.logar(dataLogin).subscribe(response => {

    // ====================================================================================== //
    // CONTROLE DE ACESSO //

      const tpu = sessionStorage.setItem('t', response.tpusuario)
      const u = sessionStorage.setItem('u', response.LoginId)

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
