import { Component } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-de-fornecedores',
  templateUrl: './gerenciamento-de-fornecedores.component.html',
  styleUrls: ['./gerenciamento-de-fornecedores.component.css']
})
export class GerenciamentoDeFornecedoresComponent {


  nomeFornecedor!: string;
  cnpj!: number;
  telefone!: number;
  emailCadastroFornecedor!: string;
  descricaoFornecedor!: string;

  

}