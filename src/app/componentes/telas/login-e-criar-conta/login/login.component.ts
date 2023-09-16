import { Component } from '@angular/core';
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
