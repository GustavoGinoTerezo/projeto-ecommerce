import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ServiceUrlGlobalService } from 'src/app/services/servicesAPI/serviceUrlGlobal/service-url-global.service';

interface Ordenar {
  ordem: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, OnDestroy {

  private inicializacaoConcluidaSubscription!: Subscription;
  private categoriasSubscription!: Subscription;
  private produtosSubscription!: Subscription;
  private fotosProdutosSubscription!: Subscription;

  ordem: Ordenar[] = [];
  ordemSelecionado: Ordenar | undefined;

  categoria: Categorias | undefined;
  nomeCategoria: string | null = null;
  categorias: Categorias[] = [];
  first: number = 0; // Primeiro item da página
  rows: number = 9; // Número de itens por página
  produtos: Produtos[] = []
  produtosDaCategoria: Produtos[] = []
  fotosProdutos: any[] = [];

  search!: string;

  tipo1Fotos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
    private urlGlobal: ServiceUrlGlobalService,
    private appToast: AppComponent,
    private router: Router,
  ) {}

  async ngOnInit() {

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarCategoriasEProdutosERouter();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarCategoriasEProdutosERouter();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });

    this.ordem = [
      { ordem: 'Valor crescente ($-$$)'},
      { ordem: 'Valor decrescente ($$-$)'},
      { ordem: 'Ordem alfabética (A-Z)'},
      { ordem: 'Ordem alfabética (Z-A)'}
   ];

   this.ordenarProdutos();

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

  }

  async carregarCategoriasEProdutosERouter() {
    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe(async (categoriasAPI) => {
      this.categorias = categoriasAPI;
    });

    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI.filter(produto => typeof produto.status === 'string' && (produto.status === '1' || produto.status === '2'));;
    });

    this.fotosProdutosSubscription = this.categoriasService.getFotosProdutos().subscribe(async (fotosProdutosAPI) => {
      this.fotosProdutos = fotosProdutosAPI;

      this.tipo1Fotos = [];

      this.fotosProdutos.forEach((foto) => {
        if (foto.prodFotoTp === '1') {
          this.tipo1Fotos.push(foto);
        }
      });
      console.log("Tipo1Fotos: ",this.tipo1Fotos)
    });

    this.route.params.subscribe((params) => {
      this.nomeCategoria = params['nome'];

      if (this.nomeCategoria) {
        const nomeOriginal = this.nomeCategoria.replace(/-/g, ' ');
        this.categoria = this.produtoService.obterCategoriaPorNome(nomeOriginal);

          // FILTRA E MOSTRA OS PRODUTOS DA CATEGORIA CORRESPONDENTE
          this.produtosDaCategoria = this.produtos.filter(produto => produto.catId === this.categoria!.catId && typeof produto.status === 'string' && (produto.status === '1' || produto.status === '2'));
      }
    });
  }

  navigateToDetalheProduto(produto: Produtos) {
    const nomeFormatado = produto.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/detalhe-produto', nomeFormatado]);
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  adicionarAoCarrinho(produto: Produtos): void {

    const saldo = produto.qtdEntrada - produto.qtdSaida

    if(saldo > 0) {
    // Recupere o carrinho criptografado do sessionStorage
    const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');
    const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

    let carrinho: number[] = [];

    if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
      // Descriptografe o carrinho se ele existir
      const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

      // Verifique se a descriptografia foi bem-sucedida
      if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
        try {
          // Converta o resultado descriptografado de volta em um array
          carrinho = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          // Em caso de erro na análise JSON, inicialize o carrinho como um array vazio
          carrinho = [];
        }
      }
    }

    // Verifique se o produto possui um ID válido antes de adicioná-lo ao carrinho
    if (produto.prodId !== undefined) {
      // Adicione o ID do produto ao carrinho
      carrinho.push(produto.prodId);

      // Criptografe o carrinho atualizado e converta para string antes de salvar no sessionStorage
      const b031d16372c388ed5c4462fe1e968adaaa821c5ab62e3b20497569ffe802b0cb = AES.encrypt(JSON.stringify(carrinho), a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb).toString();

      // Salve o carrinho criptografado no sessionStorage
      sessionStorage.setItem('c', b031d16372c388ed5c4462fe1e968adaaa821c5ab62e3b20497569ffe802b0cb);

      // Exiba uma mensagem ou realize outras ações necessárias

      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Produto adicionado ao carrinho'
      const icon = 'fa-solid fa-cart-shopping'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    }

    } else {

      const tipo = 'error';
      const titulo = '';
      const mensagem = 'Produto sem estoque';
      const icon = 'fa-solid fa-face-frown';

      this.appToast.toast(tipo, titulo, mensagem, icon);

    }
  }

  formatarNomeProduto(produtos: string): string {
    return this.categoriasService.formatarNomeProduto(produtos);
  }

  filtrarProdutos(): void {
    if (!this.search || this.search.trim() === '') {
      // Se o campo de pesquisa estiver vazio, redefina a lista de produtos
      this.produtosDaCategoria = this.produtos;
    } else {
      const termoDePesquisa = this.search.toLowerCase().trim();
      // Filtrar os produtos com base no termo de pesquisa
      this.produtosDaCategoria = this.produtos.filter(produto => {
        // Adicione aqui a lógica para verificar se o produto corresponde ao termo de pesquisa
        // Por exemplo, pode verificar o nome ou a descrição do produto
        return (
          produto.nome!.toLowerCase().includes(termoDePesquisa) ||
          produto.descBreve!.toLowerCase().includes(termoDePesquisa)
        );
      });
    }
  }

  ordenarProdutos(): void {
    if (this.ordemSelecionado) {
      switch (this.ordemSelecionado.ordem) {
        case 'Valor crescente ($-$$)':
          this.produtosDaCategoria.sort((a, b) => (a.preco || 0) - (b.preco || 0));
          break;
        case 'Valor decrescente ($$-$)':
          this.produtosDaCategoria.sort((a, b) => (b.preco || 0) - (a.preco || 0));
          break;
        case 'Ordem alfabética (A-Z)':
          this.produtosDaCategoria.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
          break;
        case 'Ordem alfabética (Z-A)':
          this.produtosDaCategoria.sort((a, b) => (b.nome || '').localeCompare(a.nome || ''));
          break;
        default:
          // Nenhuma ordenação selecionada
          break;
      }
    }
  }

  get totalRecords(): number {
    return this.produtosDaCategoria?.length || 0;
  }

  getImagensProduto(produto: Produtos): any[] {
    const idProduto = produto.prodId;
    return this.tipo1Fotos.filter((foto) => foto.prodId === idProduto);
  }

  getImagemURL(imagem: any): string {
    const url = this.urlGlobal.url;
    const endpoint = 'fotos/';
    return `${url}${endpoint}${imagem.imgfomulacao}`;
  }

  


}




