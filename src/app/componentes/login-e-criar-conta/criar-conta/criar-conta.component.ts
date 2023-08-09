import { Component } from '@angular/core';

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

}
