import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Component } from '@angular/core';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';

@Component({
  selector: 'app-gerenciamento-de-clientes',
  templateUrl: './gerenciamento-de-clientes.component.html',
  styleUrls: ['./gerenciamento-de-clientes.component.css']
})
export class GerenciamentoDeClientesComponent {

  usuarios: Usuario[] = []

  constructor(
    private usuariosService: ServiceUsuariosService,
  ){}

  ngOnInit(){

    this.usuarios = this.usuariosService.getUsuarios()

  }

  

}
