import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Imagens, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';
import { ServiceApiComentariosService } from 'src/app/services/servicesAPI/serviceAPI-Comentarios/service-api-comentarios.service';
import { ServiceComentariosService } from 'src/app/services/serviceComentarios/service-comentarios.service';
import { ServiceFornecedoresService } from 'src/app/services/serviceFornecedores/service-fornecedores.service';
import { ServiceNotaFiscalService } from 'src/app/services/serviceNotaFiscal/service-nota-fiscal.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  private inicializacaoConcluidaSubscription!: Subscription;
  private categoriasSubscription!: Subscription;
  private produtosSubscription!: Subscription;
  private comentariosSubscription!: Subscription;
  private fornecedoresSubscription!: Subscription;
  private notaFiscalCorpoSubscription!: Subscription;

  categorias: Categorias[] = [];
  produtos: Produtos[] = [];
  produto: any | undefined;
  comentario: any[] = []

  nomeProduto: string | null = null;

  prodId!: number;

  nomeProdutoFormatado: string | null = null;
  produtoDaCategoria!: Produtos;
  cep!: string;
  novoComentario: string = '';

  fornecedores: any[] = [];

  descricaoFornecedor!: string

  notaFiscalCorpo: any[] = []

  constructor(
    private route: ActivatedRoute,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
    private comentariosAPIService: ServiceApiComentariosService,
    private comentariosService: ServiceComentariosService,
    private fornecedoresService: ServiceFornecedoresService,
    private notaFiscalService: ServiceNotaFiscalService,
    private appToast: AppComponent,
  ) {}

  async ngOnInit() {

    const start = sessionStorage.getItem('start')

    if(start){
      await this.carregarCategoriasEProdutosERouter();
      await this.carregarComentariosAPI();
      await this.carregarNotaFiscalCorpoAPI();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(async () => {
          await this.carregarCategoriasEProdutosERouter();
          await this.carregarComentariosAPI();
          await this.carregarNotaFiscalCorpoAPI();
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

    if (this.comentariosSubscription) {
      this.comentariosSubscription.unsubscribe();
    }
    
    if (this.fornecedoresSubscription) {
      this.fornecedoresSubscription.unsubscribe();
    }

    if (this.notaFiscalCorpoSubscription) {
      this.notaFiscalCorpoSubscription.unsubscribe();
    }


  }

  async carregarComentariosAPI() {
    await this.comentariosService.atualizarComentariosDaAPI();
    await this.carregarComentarios();
  }

  async carregarComentarios() {
    this.comentariosSubscription = this.comentariosService.getComentarios().subscribe((comentariosAPI) => {
      this.comentario = comentariosAPI.filter(comentario => comentario.aprovado === 1 && comentario.prodId === this.produto!.prodId);
      console.log(this.comentario)
    });
  }

  async carregarFornecedoresAPI() {
    await this.fornecedoresService.atualizarFornecedoresDaAPI();
    await this.carregarFornecedores();
    await this.carregarInfomacaoFornecedor();
  }

  async carregarFornecedores() {
    this.fornecedoresSubscription = this.fornecedoresService.getFornecedores().subscribe((fornecedoresAPI) => {
      this.fornecedores = fornecedoresAPI;
    });
  }

  async carregarInfomacaoFornecedor(){

    const objetoNotaFiscal = this.encontrarObjetoNaNotaFiscal(this.prodId);
  
      if (objetoNotaFiscal) {
        console.log("Objeto da nota fiscal correspondente:", objetoNotaFiscal);
  
        // Obtenha o FornecedorId do objeto da nota fiscal
        const fornecedorId = objetoNotaFiscal.NotaEntradaCabeca.FornecedorId;
  
        // Use o FornecedorId para encontrar o fornecedor correspondente no array de fornecedores
        const fornecedorCorrespondente = this.encontrarFornecedorPorId(fornecedorId);
  
        if (fornecedorCorrespondente) {
          console.log("Fornecedor correspondente:", fornecedorCorrespondente);
          
          this.descricaoFornecedor = fornecedorCorrespondente.descricao

        } else {
          console.log("Nenhum fornecedor correspondente encontrado.");
        }
      } else {
        console.log("Nenhum objeto correspondente na nota fiscal encontrado.");
      }

  }

  async carregarNotaFiscalCorpoAPI() {
    await this.notaFiscalService.atualizarNotaFiscalCorpoDaAPI();
    await this.carregarNotaFiscalCorpo();
    await this.carregarFornecedoresAPI();
  }

  async carregarNotaFiscalCorpo() {
    this.notaFiscalCorpoSubscription = this.notaFiscalService.getNotaFiscalCorpo().subscribe((notaFiscalCorpoAPI) => {
      this.notaFiscalCorpo = notaFiscalCorpoAPI;
  
     
    });
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

        this.prodId = this.produto.prodId

        this.nomeProdutoFormatado = this.produtoService.formatarNomeProduto(this.nomeProduto);
      }
    })
  }

  encontrarFornecedorPorId(fornecedorId: number) {
    return this.fornecedores.find((fornecedor) => fornecedor.FornecedorId === fornecedorId);
  }

  encontrarObjetoNaNotaFiscal(prodId: number) {
    return this.notaFiscalCorpo.find((item) => item.prodId === prodId);
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
          const tipo = 'error'
          const titulo = ''
          const mensagem = 'Erro ao adicionar o produto ao carrinho. Tente novamente mais tarde.'
          const icon = 'fa-solid fa-face-frown'

          this.appToast.toast(tipo, titulo, mensagem, icon);
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

    }

    const tipo = 'success'
    const titulo = ''
    const mensagem = 'Produto adicionado ao carrinho'
    const icon = 'fa-solid fa-cart-shopping'

    this.appToast.toast(tipo, titulo, mensagem, icon);
  }

  adicionarComentario() {
    // Verifique se o novoComentario não está vazio
    
    const dataComentario = {
      prodId: this.produto?.prodId,
      mensagem: this.novoComentario,
      aprovado: 0
    }

    this.comentariosAPIService.cadastrarComentario(dataComentario).subscribe((response) => {
      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Comentário enviado para análise.'
      const icon = 'fa-solid fa-check'
  
      this.appToast.toast(tipo, titulo, mensagem, icon);
    },
    (error) => {
      
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro ao enviar comentário.'
      const icon = 'fa-solid fa-face-frown'
  
      this.appToast.toast(tipo, titulo, mensagem, icon);

    })

    // Limpe o campo de entrada
    this.novoComentario = '';

  }

}


