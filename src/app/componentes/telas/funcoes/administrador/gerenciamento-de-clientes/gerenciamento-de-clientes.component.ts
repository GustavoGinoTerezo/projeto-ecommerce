import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Component } from '@angular/core';
import { Product, ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';

@Component({
  selector: 'app-gerenciamento-de-clientes',
  templateUrl: './gerenciamento-de-clientes.component.html',
  styleUrls: ['./gerenciamento-de-clientes.component.css']
})
export class GerenciamentoDeClientesComponent {

  products!: Product[];

  selectedProduct!: Product;
  usuarios: Usuario[] = []


  constructor(
    private usuariosService: ServiceUsuariosService,
  ){}

  ngOnInit(){

    this.usuarios = this.usuariosService.getUsuarios();

    this.usuariosService.getProductsMini().then((data) => {
      this.products = data;
  });

  }



}
