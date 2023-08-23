import { Component } from '@angular/core';
import { ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  usuario: Usuario[] = []
  first: number = 0; // Primeiro item da página
  rows: number = 3; // Número de itens por página

  constructor(
    private usuarioService: ServiceUsuarioLogadoService
  ){}

  ngOnInit(){

    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario)

  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  calculateTotalRecords(): number {
    let total = 0;
    for (const usuario of this.usuario) {
      total += usuario.enderecoEntrega?.length || 0;
    }
    return total;
  }


}
