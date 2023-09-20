import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriaVazia, Categorias, PosicaoProdutos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { ServiceAPICategoriaService } from 'src/app/services/servicesAPI/serviceAPI-Categoria/service-api-categoria.service';
import { ServiceAPIProdutoService } from 'src/app/services/servicesAPI/serviceAPI-Produto/service-api-produto.service';

interface Status {
  nome: string;
  cod: string;
}

interface Layout {
  nome: string;
  cod: string;
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
  produtos: Produtos[] = [];
  posicaoProdutos: PosicaoProdutos[] = [];

  idProduto!: number;
  posProdId!: number;


  categoriasFiltradas: Categorias[] = [];
  categoriasSelecionada!: Categorias;
  categoriasSelecionadaInput: Categorias | null = null;
  nomeProduto: string = '';
  valorProduto!: number | null
  descCompleta: string = '';
  descBreve: string = '';
  quantidadeProduto!: number | null

  selectedProductImages: any[] = [];
  selectedProductImagesTemplate: any[] = [];
  valorProdutoFormatted!: number | null;
  categoriasAdicionarSelecionadaInput: any;
  nomeCategoriaSelecionada!: string;

  adicionarCategoriaDisabled: boolean = false;
  adicionarProdutoDisabled: boolean = false;


  isDragOver = false;

  status!: Status[] ;
  layout!: Layout[] ;

  statusDesconhecido: Status = { nome: '', cod: '' };
  selectedStatus: Status | null = null;

  selectedLayout: Layout | null = null;

  categoriaVazia: CategoriaVazia = {
    nome: '',
  };

  constructor(
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    private apiCategoriaService: ServiceAPICategoriaService,
    private apiProdutoService: ServiceAPIProdutoService,
    private http: HttpClient,

  ){}

  ngOnInit(){

    // Aguarde um curto período de tempo antes de acessar as categorias
    // ou utilize observables para lidar com a conclusão da chamada da API
    setTimeout(() => {

      this.categorias = this.categoriasService.categoriasAPI;

      this.produtos = this.categoriasService.produtosAPI;

      this.posicaoProdutos = this.categoriasService.posicaoProdutosAPI

    }, 1000); // Aguarda  segundo (ajuste conforme necessário)

    this.status = [
      { nome: 'Disponível', cod: "1"},
      { nome: 'Indisponível', cod: "2"},
      { nome: 'Não vísivel', cod: "3"},
    ];

    this.layout = [
      { nome: 'Padrão', cod: "0"},
      { nome: 'Em destaque', cod: "1"},
      { nome: 'Mais vendidos', cod: "2"},
      { nome: 'Em promoção', cod: "3"},
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

  updateInputFieldsWithSelectedProduct(produto: Produtos) {
    this.adicionarProdutoDisabled = true;

    this.idProduto = produto.prodId!;
    this.idCategoria = produto.catId!;

    // Encontre o objeto correspondente em posicaoProdutos usando o prodId
    const posicaoProdutoEncontrado = this.posicaoProdutos.find(posicao => posicao.prodId === this.idProduto);
    // Atribua posProdId a partir de posicaoProdutoEncontrado
    this.posProdId = posicaoProdutoEncontrado!.posProdId!;
    // Agora, posProdId conterá o valor
    console.log('posProdId:', this.posProdId);

    this.nomeProduto = produto.nome || '';
    // Encontre a categoria correspondente ou defina como null
    this.categoriasSelecionadaInput = this.categorias.find(categoria => categoria.catId === produto.catId) || null;
    this.valorProduto = produto.preco || null;
    this.valorProdutoFormatted = this.formatCurrency(this.valorProduto!);
    // Encontre o status correspondente ou use o status "desconhecido" como padrão
    this.selectedStatus = this.status.find(status => status.cod === produto.status!.toString()) || this.statusDesconhecido;
    // Encontre o objeto relevante em posicaoProdutos usando produto.prodId como referência
    const posicaoProduto = this.posicaoProdutos.find(posicao => posicao.prodId === produto.prodId);
    // Defina selectedLayout com base em posicaoProduto
    if (posicaoProduto) {
      // Aqui você pode definir a lógica para mapear posicaoProduto.posProdTp para o objeto Layout correto
      if (posicaoProduto.posProdTp === '0') {
        this.selectedLayout = { nome: 'Padrão', cod: "0"};
      } else if (posicaoProduto.posProdTp === '1') {
        this.selectedLayout = { nome: 'Em destaque', cod: "1"};
      } else if (posicaoProduto.posProdTp === '2') {
        this.selectedLayout = { nome: 'Mais vendidos', cod: "2"};
      } else if (posicaoProduto.posProdTp === '3') {
        this.selectedLayout = { nome: 'Em promoção', cod: "3"};
      } else {
        // Lidar com outros casos ou definir um valor padrão se necessário
        this.selectedLayout = null;
      }
    } else {
      // Lidar com o caso em que posicaoProduto não foi encontrado
      this.selectedLayout = null;
    }
    this.descBreve = produto.descBreve || '';
    this.descCompleta = produto.descCompleta || '';

    this.adicionarProdutoDisabled = true;
    this.selectedProductImages = produto.imagem || [];

    // Adicione um console.log para registrar todos os campos
    console.log('Campos atualizados:', {
      idProduto: this.idProduto,
      nomeProduto: this.nomeProduto,
      descBreve: this.descBreve,
      descCompleta: this.descCompleta,
      valorProduto: this.valorProduto,
      valorProdutoFormatted: this.valorProdutoFormatted,
      adicionarProdutoDisabled: this.adicionarProdutoDisabled,
      selectedProductImages: this.selectedProductImages,
      idCategoria: this.idCategoria,
      categoriasSelecionadaInput: this.categoriasSelecionadaInput,
      selectedStatus: this.selectedStatus,
      selectedLayout: this.selectedLayout,
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedCharacters = /[0-9.]/; // Permitir números e ponto (.)
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  onValorProdutoInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sanitizedValue = inputValue.replace(/,/g, '.'); // Substituir todas as vírgulas por ponto (.)

    // Verificar se há um valor válido antes de formatar
    if (sanitizedValue !== null && sanitizedValue !== '') {
      const parsedValue = parseFloat(sanitizedValue);
      this.valorProdutoFormatted = isNaN(parsedValue) ? null : parsedValue;
    } else {
      this.valorProdutoFormatted = null;
    }
  }

  formatCurrency(value: number): number {
    return value;
  }

  limparCampos() {
    this.adicionarProdutoDisabled = false;
    this.nomeProduto = '';
    this.valorProdutoFormatted = null;
    this.descCompleta = '';
    this.descBreve = '';
    this.quantidadeProduto = null;
    this.categoriasSelecionadaInput = null;
    this.selectedStatus = null;
    this.selectedLayout = null;
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

  onCategoriaAdicionarProdutoSelect(event: any) {
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

  private atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  onUpload(event:UploadEvent) {
    for (let file of event.files) {
      this.selectedProductImages.push(file);
    }
    console.log(this.selectedProductImages)
  }

  //===============================================================================================//
  //MENSAGENS TOAST

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

  //===============================================================================================//
  //API CATEGORIA

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

    const novoNomeCategoria = {
      nome: this.nomeCategoriaSelecionada
    }

    const mensagemSucesso = "Categoria atualizada com sucesso."
    const mensagemErro = "Erro ao atualizar a categoria."

    this.apiCategoriaService.atualizarCategoria(this.idCategoria, novoNomeCategoria).subscribe(
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

    const mensagemSucesso = "Categoria excluída com sucesso."
    const mensagemErro = "Erro ao excluir a categoria."

    this.apiCategoriaService.excluirCategoria(this.idCategoria).subscribe(
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

  //===============================================================================================//
  //API PRODUTO

  adicionarProduto(){

    const dataProduto = {
      catId: this.idCategoria,
      nome: this.nomeProduto,
      status: this.selectedStatus!.cod,
      descBreve: this.descBreve,
      descCompleta: this.descCompleta,
      preco: this.valorProdutoFormatted,
      qtdEntrada: 0,
      qtdSaida: 0
    }

    this.apiProdutoService.cadastrarProduto(dataProduto).subscribe(
      (response) => {
        console.log("Produto adicionado com sucesso", response)

        const prodId = response.prodId

        const dataPosProduto = {
          posProdTp: this.selectedLayout!.cod,
          prodId: prodId
        }

        this.apiProdutoService.cadastrarPosicaoProduto(dataPosProduto).subscribe(
          (response) => {
            console.log("Posição do produto cadastrada com sucesso", response)
            this.atualizarPagina();
          },
          (error) => {
            console.log("Erro no cadastro da posição do produto", error)
          }
        )

        // for(const imagem of this.selectedProductImages){
        //   const dataFotosProduto = {
        //     prodId: prodId,
        //     prodFotoTp: 1,
        //     imgfomulacao: imagem.name.toString()
        //   }

        //   this.apiProdutoService.cadastrarFotosProduto(dataFotosProduto).subscribe(
        //     (response) => {
        //       console.log("Foto do produto cadastrada com sucesso", response)
        //     },
        //     (error) => {
        //       console.log("Erro no cadastro da foto do produto", error)
        //     }
        //   )
        // };

      },
      (error) => {
        console.log("Erro ao cadastrar produto", error)
      }
    )
  }

  atualizarProduto(){

    const dataProduto = {
      catId: this.idCategoria,
      nome: this.nomeProduto,
      status: this.selectedStatus!.cod,
      descBreve: this.descBreve,
      descCompleta: this.descCompleta,
      preco: this.valorProdutoFormatted,
    }

    this.apiProdutoService.atualizarProduto(this.idProduto, dataProduto).subscribe(
      (response) => {
        console.log("Produto atualizado com sucesso", response)
      },
      (error) => {
        console.log("Erro ao atualizar produto.")
      }
    )

    const dataPosicaoProduto = {
      posProdTp: this.selectedLayout!.cod
    }

    this.apiProdutoService.atualizarPosicaoProduto(this.posProdId, dataPosicaoProduto).subscribe((response) => {
      console.log("Posição do produto atualizada com sucesso", response)
      this.atualizarPagina();
    },
    (error) => {
      console.log("Erro ao atualizar posição do produto.", error)
    }
    )
  }

  excluirProduto(){

    this.apiProdutoService.excluirPosicaoProduto(this.posProdId).subscribe((response) => {
      console.log("Posição do produto excluída com sucesso", response)
      this.apiProdutoService.excluirProduto(this.idProduto).subscribe((response) => {
        console.log("Produto excluído com sucesso", response)
        this.atualizarPagina();
      },
      (error) => {
        console.log("Erro ao excluir o produto.", error)
      }
      )
    },
    (error) => {
      console.log("Erro ao excluir posição do produto.", error)
    }
    )

  }









}
