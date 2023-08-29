import { Component } from '@angular/core';
import { Categorias, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';

interface City {
  name: string;
}

@Component({
  selector: 'app-adicionar-categorias-e-produtos',
  templateUrl: './adicionar-categorias-e-produtos.component.html',
  styleUrls: ['./adicionar-categorias-e-produtos.component.css']
})
export class AdicionarCategoriasEProdutosComponent {

  categorias: Categorias[] = [];
  categoriasFiltradas: Categorias[] = []
  categoriasSelecionada!: Categorias;

  nome: string = '';
  email: string = '';
  cpfOuCnpj!: number | null
  cep!: number | null
  telefone!: number | null
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroResidencia!: number | null

  countries!: any[] ;
  selectedCountry!: any;
  cities!: City[] ;
  selectedCity!: City;

  constructor(
    private categoriasService: ServiceCategoriasService,
  ){}

  ngOnInit(){

    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );

    this.categoriasService.getCategoriasTabela().then((data) => {
      this.categoriasFiltradas = data;
    });

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];

    this.cities = [
      { name: 'Disponível'},
      { name: 'Indisponível' },
    ];


  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase();

    if (!this.categorias) {
      this.categoriasFiltradas = [];
    } else {
      this.categoriasFiltradas = this.categorias.filter(categoria => {
        const produtosFiltrados = categoria.produtos?.filter(produto => {
          return produto.nome?.toLowerCase().includes(filterValue);
        });

        return (
          categoria.nome?.toLowerCase().includes(filterValue) ||
          (produtosFiltrados && produtosFiltrados.length > 0)
        );
      });
    }
  }








  updateInputFieldsWithSelectedUser() {
    if (this.categoriasSelecionada) {
      this.nome = this.categoriasSelecionada.nome || '';
    }
  }

  limparCampos() {
    this.nome = '';
  }


}
