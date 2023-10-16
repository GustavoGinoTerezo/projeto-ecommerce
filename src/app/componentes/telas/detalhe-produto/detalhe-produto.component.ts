import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Imagens, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';
import { ServiceApiComentariosService } from 'src/app/services/servicesAPI/serviceAPI-Comentarios/service-api-comentarios.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  private inicializacaoConcluidaSubscription!: Subscription;
  private categoriasSubscription!: Subscription;
  private produtosSubscription!: Subscription;

  categorias: Categorias[] = [];
  produtos: Produtos[] = [];
  produto: Produtos | undefined;

  nomeProduto: string | null = null;

  nomeProdutoFormatado: string | null = null;
  produtoDaCategoria!: Produtos;
  cep!: string;
  novoComentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private comentariosAPIService: ServiceApiComentariosService,
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
      this.produtos = produtosAPI;
    });


    this.route.params.subscribe((params) => {
      this.nomeProduto = params['nome'];

      if (this.nomeProduto) {
        const nomeOriginal = this.nomeProduto.replace(/-/g, ' ');
        this.produto = this.produtoService.obterProdutoPorNome(nomeOriginal);

        this.nomeProdutoFormatado = this.produtoService.formatarNomeProduto(this.nomeProduto);
      }
    })
  }

  getProdutoImages(): string[] {
    if (this.produto) {
      return this.produto.imagem?.map((imagem: Imagens) => imagem.imagem!) || [];
    } else if (this.produtoDaCategoria) {
      return this.produtoDaCategoria.imagem?.map((imagem: Imagens) => imagem.imagem!) || [];
    } else {
      return [];
    }
  }

  adicionarAoCarrinho(produto: Produtos): void {
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
      this.showProdutoAdicionadoAoCarrinho();
    }
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'success',
      icon: 'pi pi-shopping-cart',
      detail: 'Produto adicionado ao carrinho!' });
  }

  adicionarComentario() {
    // Verifique se o novoComentario não está vazio
    
    const dataComentario = {
      prodId: this.produto?.prodId,
      mensagem: this.novoComentario,
      aprovado: 0
    }

    this.comentariosAPIService.cadastrarComentario(dataComentario).subscribe((response) => {
      console.log("Comentário cadastrado para análise", response)
    },
    (error) => {
      console.log("Erro ao cadastrar comentário", error)
    })

    // Limpe o campo de entrada
    this.novoComentario = '';
  }

}


