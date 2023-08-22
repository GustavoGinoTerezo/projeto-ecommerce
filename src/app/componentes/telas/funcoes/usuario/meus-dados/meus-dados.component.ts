import { Component } from '@angular/core';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  nome!: string;
  telefone!: number;
  email!: string;
  cpfOuCnpj!: number;
  dataNascimento!: number;

}
