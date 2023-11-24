import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
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

  private inicializacaoConcluidaSubscription!: Subscription;
  private categoriasSubscription!: Subscription;
  private produtosSubscription!: Subscription;
  private posicaoProdutosSubscription!: Subscription;
  private fotosProdutosSubscription!: Subscription;

  idCategoria!: number;
  categorias: Categorias[] = [];
  produtos: Produtos[] = [];
  fotosProdutos: any[] = [];
  posicaoProdutos: PosicaoProdutos[] = [];
  idProduto!: number;
  posProdId!: number;
  produtosFiltrados!: Produtos[];
  categoriasSelecionada!: Categorias;
  categoriasSelecionadaInput: Categorias | null = null;
  nomeProduto: string = '';
  informacaoTecnica: string = '';
  valorProduto!: number | null
  descCompleta: string = '';
  descBreve: string = '';
  quantidadeProduto!: number | null
  selectedProductImages: any[] = [];
  selectedProductImagesFormulacao: any[] = [];
  selectedProductImagesTemplate: any[] = [];
  valorProdutoFormatted!: number | null;
  categoriasAdicionarSelecionadaInput: any;
  nomeCategoriaSelecionada!: string;
  pesoProduto!: number | null;
  alturaProduto!: number | null;
  larguraProduto!: number | null;
  comprimentoProduto!: number | null;

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
    private apiCategoriaService: ServiceAPICategoriaService,
    private apiProdutoService: ServiceAPIProdutoService,
    private appToast: AppComponent,
  ){}

  ngOnInit(){

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarCategoriasEProdutosEPosicoes();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarCategoriasEProdutosEPosicoes();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });

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

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }

    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }

    if (this.posicaoProdutosSubscription) {
      this.posicaoProdutosSubscription.unsubscribe();
    }

    if (this.fotosProdutosSubscription) {
      this.fotosProdutosSubscription.unsubscribe();
    }

  }

  async carregarCategoriasEProdutosEPosicoes() {

    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe(async (categoriasAPI) => {
      this.categorias = categoriasAPI;
    });

    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI;
    });

    this.posicaoProdutosSubscription = this.categoriasService.getPosicaoProdutos().subscribe(async (posicaoProdutosAPI) => {
      this.posicaoProdutos = posicaoProdutosAPI;
    });

    this.fotosProdutosSubscription = this.categoriasService.getFotosProdutos().subscribe(async (fotosProdutosAPI) => {
      this.fotosProdutos = fotosProdutosAPI;

      console.log(this.fotosProdutos)
    });

    this.produtosFiltrados = this.produtos

  }

  filterTable(event: any) {
    const searchText = event.target.value.toLowerCase();

    if (!searchText) {
      // Se o campo de pesquisa estiver vazio, redefina a lista de produtos para a lista original
      this.produtos = this.produtosFiltrados;
    } else {
      // Caso contrário, filtre os produtos com base no texto de pesquisa
      this.produtos = this.produtosFiltrados.filter(produto =>
        produto.nome!.toLowerCase().includes(searchText)
      );
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
    
    this.pesoProduto = produto.peso || null;
    this.alturaProduto = produto.altura || null;
    this.larguraProduto = produto.largura || null;
    this.comprimentoProduto = produto.comprimento || null;

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
    this.informacaoTecnica = produto.informacaoTecnica || '';

    this.selectedProductImages = produto.imagem || [];

    // Adicione um console.log para registrar todos os campos
    console.log('Campos atualizados:', {
      idProduto: this.idProduto,
      nomeProduto: this.nomeProduto,
      altura: this.alturaProduto,
      largura: this.larguraProduto,
      peso: this.pesoProduto,
      comprimento: this.comprimentoProduto,
      descBreve: this.descBreve,
      descCompleta: this.descCompleta,
      informacaoTecnica: this.informacaoTecnica,
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
    this.pesoProduto = null;
    this.alturaProduto = null;
    this.larguraProduto = null;
    this.comprimentoProduto = null;
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

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.getBase64(file).then((base64Data: string) => {
        const imageData = {
          name: file.name,
          base64: base64Data,
          file: file, // Adicionando o objeto File ao imageData
        };
        this.selectedProductImages.push(imageData);
      });
    }
  }

  onUploadFormulacao(event: UploadEvent) {
    for (let file of event.files) {
      this.getBase64(file).then((base64Data: string) => {
        const imageData = {
          name: file.name,
          base64: base64Data,
          file: file,
        };
        this.selectedProductImagesFormulacao.push(imageData);
      });
    }
  }
  
  mapStatusName(statusCod: string): string {
    const status = this.status.find(s => s.cod === statusCod);
    return status ? status.nome : 'Desconhecido'; // Retorna "Desconhecido" se não encontrar um status correspondente
  }

  mapCategoryName(catId: number | undefined): string {
    if (catId === undefined) {
      return 'Desconhecida';
    }
    const category = this.categorias.find(c => c.catId === catId);
    return category ? category.nome || 'Desconhecida' : 'Desconhecida';
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
      
      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Categoria adicionada com sucesso.'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);

      this.atualizarPagina();
    },
    (error) => {
      
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro ao adicionar categoria.'
      const icon = 'fa-solid fa-face-frown'

      this.appToast.toast(tipo, titulo, mensagem, icon);

    }
    )

    

  }

  atualizarCategoria(){

    const novoNomeCategoria = {
      nome: this.nomeCategoriaSelecionada
    }

    

    this.apiCategoriaService.atualizarCategoria(this.idCategoria, novoNomeCategoria).subscribe(
      (response) => {
        
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Categoria atualizada com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);

        this.atualizarPagina();
      },
      (error) => {
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao atualizar categoria.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);
      }
    );
  }

  excluirCategoria() {

    this.apiCategoriaService.excluirCategoria(this.idCategoria).subscribe(
      (response) => {
        
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Categoria excluída com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);

        this.atualizarPagina();
      },
      (error) => {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao excluir categoria.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

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
      qtdSaida: 0,
      informacaoTecnica: this.informacaoTecnica,
      altura: this.alturaProduto,
      largura: this.larguraProduto,
      peso: this.pesoProduto,
      comprimento: this.comprimentoProduto
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
            const tipo = 'success'
            const titulo = ''
            const mensagem = 'Produto cadastrado com sucesso.'
            const icon = 'fa-solid fa-check'

            this.appToast.toast(tipo, titulo, mensagem, icon);

            this.atualizarPagina();
          },
          (error) => {
            const tipo = 'error'
            const titulo = ''
            const mensagem = 'Erro ao cadastrar o produto.'
            const icon = 'fa-solid fa-face-frown'

            this.appToast.toast(tipo, titulo, mensagem, icon);
          }
        )

        for (const imageData of this.selectedProductImages) {
          const dataFotosProduto = new FormData();
          dataFotosProduto.append('prodId', prodId);
          dataFotosProduto.append('prodFotoTp', '1');
          dataFotosProduto.append('file', imageData.file);
      
          this.apiProdutoService.cadastrarFotosProduto(dataFotosProduto).subscribe(
            (response) => {
              const tipo = 'success'
              const titulo = ''
              const mensagem = 'Foto cadastrada com sucesso.'
              const icon = 'fa-solid fa-check'

              this.appToast.toast(tipo, titulo, mensagem, icon);
            }, 
            (error) => {
              const tipo = 'success'
              const titulo = ''
              const mensagem = 'Erro ao cadastrar foto.'
              const icon = 'fa-solid fa-check'

              this.appToast.toast(tipo, titulo, mensagem, icon);
            }
          );
        }

        for (const imageDataFormulacao of this.selectedProductImagesFormulacao) {
          const dataFotosProdutoFormulacao = new FormData();
          dataFotosProdutoFormulacao.append('prodId', prodId);
          dataFotosProdutoFormulacao.append('prodFotoTp', '2');
          dataFotosProdutoFormulacao.append('file', imageDataFormulacao.file);
      
          this.apiProdutoService.cadastrarFotosProduto(dataFotosProdutoFormulacao).subscribe(
            (response) => {
              const tipo = 'success'
              const titulo = ''
              const mensagem = 'Foto cadastrada com sucesso.'
              const icon = 'fa-solid fa-check'

              this.appToast.toast(tipo, titulo, mensagem, icon);
            }, 
            (error) => {
              const tipo = 'success'
              const titulo = ''
              const mensagem = 'Erro ao cadastrar foto.'
              const icon = 'fa-solid fa-check'

              this.appToast.toast(tipo, titulo, mensagem, icon);
            }
          );
        }
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
      informacaoTecnica: this.informacaoTecnica,
      altura: this.alturaProduto,
      largura: this.larguraProduto,
      peso: this.pesoProduto,
      comprimento: this.comprimentoProduto
    }

    this.apiProdutoService.atualizarProduto(this.idProduto, dataProduto).subscribe(
      (response) => {
        
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Produto atualizado com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);

      },
      (error) => {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao atualizar o produto.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

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
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Produto excluído com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);

        this.atualizarPagina();
      },
      (error) => {
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao excluir produto.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);
      }
      )
    },
    (error) => {
      console.log("Erro ao excluir posição do produto.", error)
    }
    )

  }

  
  

  
  

}
