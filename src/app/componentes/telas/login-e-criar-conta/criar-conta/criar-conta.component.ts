import { Component } from '@angular/core';
import { ServiceRegistrarService } from 'src/app/services/servicesAPI/serviceRegistrar/service-registrar.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {

  emailCadastroPrincipal!: string;
  emailCadastroSecundario!: string;
  nomeCompleto!: string;
  cpfOuCnpj!: number;
  telefonePrincipal!: string;
  telefoneSecundario!: string;
  endereco!: string;
  bairro!: string;
  cidade!: string;
  estado!: string;
  passwordCadastro!: string;
  passwordCadastroRepetir!: string;
  checked: boolean = false;

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private registrar: ServiceRegistrarService,
  ){}

  cadastrar(){

    const dataLogin = {
      nome: this.nomeCompleto,
      senha: this.passwordCadastro,
      tpusuario: "0",
      emailprinc: this.emailCadastroPrincipal,
    }

    this.registrar.registrar(dataLogin).subscribe(response => {

      console.log("Usuário cadastrado com sucesso")

      const loginId = response.loginid;
      const access_token = response.access_token;

      console.log(access_token)
      console.log(loginId)

      // Supondo que a resposta contenha o ID do login

      // const dataEndereco = {
      //   LoginId: loginId,
      //   tpcadastro: "1",
      //   endereco: this.endereco,
      //   cidade: this.cidade,
      //   bairro: this.bairro,
      //   Uf: this.estado,
      // }


      // this.registrar.registrarEndereco(dataEndereco).subscribe(result => {
      //   console.log("Endereço adicionado com sucesso")
      // });

      // const dataTelefone = {
      //   LoginId: loginId,
      //   telefone: this.telefonePrincipal
      // }

      // this.registrar.registrarTelefone(dataEndereco).subscribe(result => {
      //   console.log("Telefone adicionado com sucesso")
      // });

    });
  }


}
