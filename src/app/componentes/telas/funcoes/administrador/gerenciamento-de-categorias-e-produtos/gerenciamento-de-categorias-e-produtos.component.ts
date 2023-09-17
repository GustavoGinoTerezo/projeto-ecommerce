import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriaVazia, Categorias, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { ServiceAPICategoriaService } from 'src/app/services/servicesAPI/serviceAPI-Categoria/service-api-categoria.service';

interface City {
  name: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-gerenciamento-de-categorias-e-produtos',
  templateUrl: './gerenciamento-de-categorias-e-produtos.component.html',
  styleUrls: ['./gerenciamento-de-categorias-e-produtos.component.css']
})
export class GerenciamentoDeCategoriasEProdutosComponent {

  idCategoria!: number;
  categorias: Categorias[] = [];
  categoriasFiltradas: Categorias[] = []
  categoriasSelecionada!: Categorias;
  categoriasSelecionadaInput!: any;
  nomeProduto: string = '';
  valorProduto!: number | null
  descCompleta: string = '';
  descBreve: string = '';
  quantidadeProduto!: number | null
  adicionarProdutoDisabled: boolean = false;
  selectedProductImages: any[] = [];
  valorProdutoFormatted: string = '';
  categoriasAdicionarSelecionadaInput: any;
  nomeCategoriaSelecionada!: string;
  adicionarCategoriaDisabled: boolean = false;
  isDragOver = false;
  cities!: City[] ;
  selectedCity!: City;
  categoriaVazia: CategoriaVazia = {
    nome: '',
  };

  constructor(
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    private apiCategoriaService: ServiceAPICategoriaService
  ){}

  ngOnInit(){

    // Aguarde um curto período de tempo antes de acessar as categorias
    // ou utilize observables para lidar com a conclusão da chamada da API
    setTimeout(() => {
      this.categorias = this.categoriasService.categorias;
    }, 1000); // Aguarda  segundo (ajuste conforme necessário)


    this.categoriasService.getCategoriasTabela().then((data) => {
      this.categoriasFiltradas = data;
    });

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
    this.categoriasSelecionadaInput = null;
    this.adicionarProdutoDisabled = false;
    this.selectedProductImages = []
  }

  limparCamposCategoriaNova() {
    this.nomeCategoriaSelecionada = '';
    this.categoriasAdicionarSelecionadaInput = null;
    this.adicionarCategoriaDisabled = false;
  }

  onCategoriaAdicionarSelect(event: any) {
    this.categoriasAdicionarSelecionadaInput = event.value;
    this.nomeCategoriaSelecionada = event.value.nome || '';
    this.adicionarCategoriaDisabled = true;
    this.idCategoria = event.value.catId
    console.log(this.idCategoria)
  }

  onDragOver(event: Event): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: Event): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  adicionarCategoria(){

    const dataCadastrarCategoria = {
      nome: this.nomeCategoriaSelecionada
    }
    const mensagemSucesso = "Categoria adicionada com sucesso."
    const mensagemErro = "Erro ao adicionar a categoria."

    this.apiCategoriaService.cadastrarCategoria(dataCadastrarCategoria).subscribe
    ((response) => {
      this.showSuccess(mensagemSucesso)
      console.log("Categoria adicionada com sucesso", response)
    },
    (error) => {
      this.showError(mensagemErro)
      console.log("Erro ao adicionar a categoria", error)
    }
    )

    this.atualizarPagina();

  }

  atualizarCategoria(){

    const idCategoria = this.idCategoria;

    const novoNomeCategoria = {
      nome: this.nomeCategoriaSelecionada
    }

    const mensagemSucesso = "Categoria atualizada com sucesso."
    const mensagemErro = "Erro ao atualizar a categoria."

    this.apiCategoriaService.atualizarCategoria(idCategoria, novoNomeCategoria).subscribe(
      (response) => {
        console.log("Categoria atualizada com sucesso", response);
        this.showSuccess(mensagemSucesso)
        this.atualizarPagina();
      },
      (error) => {
        this.showError(mensagemErro)
        console.error("Erro ao atualizar a categoria", error)
      }
    );
  }

  excluirCategoria() {

    const idCategoria = this.idCategoria;
    const mensagemSucesso = "Categoria excluída com sucesso."
    const mensagemErro = "Erro ao excluir a categoria."

    this.apiCategoriaService.excluirCategoria(idCategoria).subscribe(
      (response) => {
        console.log("Categoria excluída com sucesso", response);
        this.showSuccess(mensagemSucesso)
        this.atualizarPagina();
      },
      (error) => {
        this.showError(mensagemErro)
        console.error("Erro ao excluir a categoria", error);
      }
    );
  }


  private atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }


  showSuccess(mensagemSucesso: string) {
    this.messageService.add({ severity:   'success', detail: mensagemSucesso, life: 1600});
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError(mensagemErro: string) {
    this.messageService.add({ severity: 'error', detail: mensagemErro });
  }

}
