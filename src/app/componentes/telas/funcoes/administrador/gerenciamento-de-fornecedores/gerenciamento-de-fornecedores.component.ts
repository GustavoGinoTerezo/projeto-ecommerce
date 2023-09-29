import { Component } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-de-fornecedores',
  templateUrl: './gerenciamento-de-fornecedores.component.html',
  styleUrls: ['./gerenciamento-de-fornecedores.component.css']
})
export class GerenciamentoDeFornecedoresComponent {


  cnpj!: number;
  telefone!: number;
  emailCadastroFornecedor!: string;


  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/g; // Expressão regular para permitir apenas números

    const inputChar = event.key;

    if (!inputChar.match(allowedChars)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  }

}
