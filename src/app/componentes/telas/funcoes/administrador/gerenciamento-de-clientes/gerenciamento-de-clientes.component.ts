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
  filteredProducts: Product[] = [];

  usuarios: Usuario[] = []
  usuarioSelecionado!: Usuario;
  usuariosFiltrados: Usuario[] = []

  constructor(
    private usuariosService: ServiceUsuariosService,
  ){}

  ngOnInit(){

    this.usuarios = this.usuariosService.getUsuarios();

    this.usuariosService.getUsuarioTabela().then((data) => {
      this.usuarios = data;
      this.usuariosFiltrados = data;
    });

  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (!this.usuarios) {
      this.usuariosFiltrados = [];
    } else {
      this.usuariosFiltrados = this.usuarios.filter(usuario => {
        return (
          usuario.nome?.toLowerCase().includes(filterValue) ||
          usuario.email?.toLowerCase().includes(filterValue) ||
          usuario.cep?.toLowerCase().includes(filterValue) ||
          usuario.cidade?.toString().includes(filterValue)
        );
      });
    }
  }



}
