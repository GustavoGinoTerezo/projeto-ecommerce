import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriaVazia, Categorias, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';

interface City {
  name: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
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
  categoriasSelecionadaInput!: Categorias;
  nomeProduto: string = '';
  valorProduto!: number | null
  descCompleta: string = '';
  descBreve: string = '';
  quantidadeProduto!: number | null
  adicionarProdutoDisabled: boolean = false;
  selectedProductImages: any[] = [];

  countries!: any[] ;
  selectedCountry!: any;
  valorProdutoFormatted: string = '';

  categoriasAdicionarSelecionadaInput: any;
  nomeCategoriaSelecionada: string = '';
  adicionarCategoriaDisabled: boolean = false;

  isDragOver = false;

  onDragOver(event: Event): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: Event): void {
    event.preventDefault();
    this.isDragOver = false;
  }


  cities!: City[] ;
  selectedCity!: City;

  constructor(
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
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

  updateInputFieldsWithSelectedProduct(categoria: Categorias, produto: Produtos) {
    this.categoriasSelecionadaInput = categoria;
    this.nomeProduto = produto.nome || '';
    this.descBreve = produto.descricaoBreve || '';
    this.descCompleta = produto.descricaoCompleta || '';
    this.valorProduto = produto.preco || null;
    this.valorProdutoFormatted = this.formatCurrency(this.valorProduto);
    this.adicionarProdutoDisabled = true;
    this.selectedProductImages = produto.imagem || []
  }

  categoriaVazia: CategoriaVazia = {
    nome: '',
  };

  formatCurrency(value: number | null): string {
    if (value !== null) {
      return value.toFixed(2);
    }
    return '';
  }

  onValorProdutoInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sanitizedValue = inputValue.replace(/[^\d.,]/g, ''); // Remove caracteres inválidos

    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
      this.valorProdutoFormatted = parts[0] + '.' + parts[1]; // Mantém até duas casas decimais
    } else if (parts.length === 2) {
      this.valorProdutoFormatted = parts[0] + '.' + parts[1].slice(0, 2); // Mantém até duas casas decimais
    } else {
      this.valorProdutoFormatted = sanitizedValue;
    }
  }

  limparCampos() {
    this.nomeProduto = '';
    this.valorProdutoFormatted = '';
    this.descCompleta = '';
    this.descBreve = '';
    this.quantidadeProduto = null;
    this.categoriasSelecionadaInput = this.categoriaVazia;
    this.adicionarProdutoDisabled = false;
  }

  limparCamposCategoriaNova() {
    this.nomeCategoriaSelecionada = '';
    this.categoriasAdicionarSelecionadaInput = this.categoriaVazia;
    this.adicionarCategoriaDisabled = false;
  }

  onCategoriaAdicionarSelect(event: any) {
    this.categoriasAdicionarSelecionadaInput = event.value;
    this.nomeCategoriaSelecionada = event.value.nome || '';
    this.adicionarCategoriaDisabled = true;
  }



}
