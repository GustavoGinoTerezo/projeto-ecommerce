import { Component } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-de-estados',
  templateUrl: './gerenciamento-de-estados.component.html',
  styleUrls: ['./gerenciamento-de-estados.component.css']
})
export class GerenciamentoDeEstadosComponent {

  estados: [] = []
  estadoSelecionado!: any[]
  nomeEstado!: string;
  uf!: string;
  icms!: number;

  ngOnInit(){

    

  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedCharacters = /[0-9.]/; // Permitir números e ponto (.)
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateInputFieldsWithSelectedProduct() {

  }

  filterTable(event: any) {
    const searchText = event.target.value.toLowerCase();

    if (!searchText) {
    } else {

    }
  }
}
