import { Component } from '@angular/core';
import { ServiceLoginService } from 'src/app/services/servicesAPI/serviceLogin/service-login.service';

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
    private loginService: ServiceLoginService,
  ){}

  entrar(){

    const dataLogin = {
      emailprinc: this.emailLogin,
      senha: this.passwordLogin
    }

    this.loginService.logar(dataLogin).subscribe(response => {

      const access_token = response.access_token;

      console.log(access_token)
      console.log("Login feito com sucesso")

    })

  }

}
