import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { ServiceUsuarioLogadoService, EnderecoEntrega } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ServiceUrlGlobalService } from 'src/app/services/servicesAPI/serviceUrlGlobal/service-url-global.service';

interface Caixa {
  peso?: number;
  altura?: number;
  largura?: number;
  comprimento?: number;
  tipo?: string;
  produto?: string;
  valor?: number;
}

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})

export class CarrinhoDeComprasComponent implements OnInit, OnDestroy{

  private inicializacaoConcluidaSubscription!: Subscription;
  private enderecoCarregadoSubscription!: Subscription;
  private produtosSubscription!: Subscription;
  private enderecosEntregaSubscription!: Subscription;
  private fotosProdutosSubscription!: Subscription;

  carrinho: CarrinhoDeCompra[] = [];
  firstProduto: number = 0; 
  rowsProduto: number = 5; 
  cep!: string;
  quantidade: number = 1;
  items: MenuItem[] = [];
  valorTotal: number = 0;
  produtos: Produtos[] = []
  enderecosEntrega: any[] = []
  enderecoSelecionado: any;
  checkbox!: string;
  firstEndereco: number = 0;
  rowsEndereco: number = 1;
  enderecoEntregaAtivo: boolean[] = new Array(this.enderecosEntrega.length).fill(false);
  mostrarFreteOuEndereco!: boolean;
  carrinhoIds: number[] = []

  fotosProdutos: any[] = [];
  tipo1Fotos: any[] = [];

  constructor(
    private categoriasService: ServiceCategoriasService,
    private usuarioService: ServiceUsuarioLogadoService,
    private urlGlobal: ServiceUrlGlobalService,
    private carrinhoEstadoService: ServiceCarrinhoDeComprasService,
    private router: Router,
    private appToast: AppComponent,
    ) {}

  ngOnInit(): void {

    this.carrinhoEstadoService.setCarrinhoVisitado();

    const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');
    const startEnderecos = sessionStorage.getItem('startEnderecos')
    const start = sessionStorage.getItem('start')
    const mostrarFrete = sessionStorage.getItem('at')


    if(mostrarFrete){
      this.mostrarFreteOuEndereco = true;
    } else {
      this.mostrarFreteOuEndereco = false;
    }

    const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

    if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
      // Descriptografe o carrinho se ele existir
      const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

      // Verifique se a descriptografia foi bem-sucedida
      if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
        // Converta o resultado descriptografado de volta em um array de IDs
        this.carrinhoIds = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
        console.log("CarrinhoIds", this.carrinhoIds)
      }
    }

    if(start){
      this.carregarProdutos();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarProdutos();
        });
      }
    }

    if(startEnderecos){
      this.carregarEnderecos();
    } else {
      const enderecoCarregadoObservable = this.usuarioService.getEnderecosCarregadosObservable();

      if (enderecoCarregadoObservable) {
        this.enderecoCarregadoSubscription = enderecoCarregadoObservable.subscribe(() => {
          this.carregarEnderecos();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
      sessionStorage.removeItem('startEnderecos');
    });

    this.items = [
      {
          label: 'Carrinho',
          routerLink: '/carrinho-de-compra'
      },
      {
          label: 'Pagamento',
          routerLink: '/pagamento'
      },
      {
          label: 'Confirmação',
          routerLink: '/confirmacao'
      },
      {
          label: 'Conclusão',
          routerLink: '/conclusao'
      }
    ];

  }

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }

    if (this.enderecoCarregadoSubscription) {
      this.enderecoCarregadoSubscription.unsubscribe();
    }

    if (this.enderecosEntregaSubscription) {
      this.enderecosEntregaSubscription.unsubscribe();
    }

    if (this.fotosProdutosSubscription) {
      this.fotosProdutosSubscription.unsubscribe();
    }

  }

  async carregarProdutos() {

    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI;

      const carrinhoMap: { [id: number]: CarrinhoDeCompra } = {};

        this.carrinhoIds.forEach((produtoId: any) => {
          const produtoEncontrado = this.produtos.find((produto) => produto.prodId === produtoId);
          if (produtoEncontrado) {
            // Se o produto já existe no carrinho, aumente a quantidade
            if (carrinhoMap[produtoId]) {
              carrinhoMap[produtoId].quantidade!++;
            } else {
              // Caso contrário, crie um novo item no carrinho
              carrinhoMap[produtoId] = {
                prodId: produtoEncontrado.prodId,
                altura: produtoEncontrado.altura,
                largura: produtoEncontrado.largura,
                comprimento: produtoEncontrado.comprimento,
                peso: produtoEncontrado.peso,
                nomeProduto: produtoEncontrado.nome,
                preco: produtoEncontrado.preco,
                quantidade: 1, // Defina a quantidade inicial como 1
              };
            }
          }
        });

        // Converta o objeto de carrinho de volta para um array de itens do carrinho
        this.carrinho = Object.values(carrinhoMap);

        console.log("Carrinho: ", this.carrinho)

        this.fotosProdutosSubscription = this.categoriasService.getFotosProdutos().subscribe(async (fotosProdutosAPI) => {
          this.fotosProdutos = fotosProdutosAPI;
    
          this.tipo1Fotos = [];
    
          this.fotosProdutos.forEach((foto) => {
            if (foto.prodFotoTp === '1') {
              this.tipo1Fotos.push(foto);
            }
          });
        });

        this.calcularValorTotal();
    });

  }

  gerarFrete() {

    const cepDestinoSemHifen = this.cep.replace('-', '');
  
    const jsonPedido = {
      cepOrigem: "04707000",
      cepDestino: cepDestinoSemHifen,
      origem: "nome-plataforma",
      produtos: [] as Caixa[],
      servicos: ["E", "X", "R"],
    };
  
    // Iterate over each product in the cart
    for (const item of this.carrinho) {
      // Create a Caixa object for each quantity of the product
      for (let i = 0; i < item.quantidade!; i++) {
        const caixa: Caixa = {
          peso: item.peso,
          altura: item.altura,
          largura: item.largura,
          comprimento: item.comprimento,
          tipo: "C",
          produto: item.nomeProduto,
          valor: item.preco,
        };
  
        // Add the Caixa object to the produtos array
        jsonPedido.produtos.push(caixa);
      }
    }
  
    console.log(jsonPedido);
  }
  
  carregarEnderecos(){
    this.enderecosEntregaSubscription = this.usuarioService.getEnderecoEntregaUsuarioLogado().subscribe(async (enderecosEntregaAPI) => {
      this.enderecosEntrega = enderecosEntregaAPI;
      console.log(this.enderecosEntrega)
    });
  }

  selecionarEndereco(endereco: EnderecoEntrega): void {
    
    this.enderecoSelecionado = endereco;

    this.atualizarFreteLogado()

  }

  atualizarFrete() {
        
    if(this.cep) {
      this.atualizarFreteNaoLogado()
    }

    if(this.enderecoSelecionado.cep){
      this.atualizarFreteLogado()
    }
  }

  atualizarFreteLogado(){

    const cepDestinoSemHifen = this.enderecoSelecionado.cep.replace('-', '');
  
      const jsonPedido = {
        cepOrigem: "04707000",
        cepDestino: cepDestinoSemHifen,
        origem: "nome-plataforma",
        produtos: [] as Caixa[],
        servicos: ["E", "X", "R"],
      };
    
      // Iterate over each product in the cart
      for (const item of this.carrinho) {
        // Create a Caixa object for each quantity of the product
        for (let i = 0; i < item.quantidade!; i++) {
          const caixa: Caixa = {
            peso: item.peso,
            altura: item.altura,
            largura: item.largura,
            comprimento: item.comprimento,
            tipo: "C",
            produto: item.nomeProduto,
            valor: item.preco,
          };
    
          // Add the Caixa object to the produtos array
          jsonPedido.produtos.push(caixa);
        }
      }
    
      console.log(jsonPedido);

  }

  atualizarFreteNaoLogado(){

    const cepDestinoSemHifen = this.cep.replace('-', '');

      const jsonPedido = {
        cepOrigem: "04707000",
        cepDestino: cepDestinoSemHifen,
        origem: "nome-plataforma",
        produtos: [] as Caixa[],
        servicos: ["E", "X", "R"],
      };
    
      // Iterate over each product in the cart
      for (const item of this.carrinho) {
        // Create a Caixa object for each quantity of the product
        for (let i = 0; i < item.quantidade!; i++) {
          const caixa: Caixa = {
            peso: item.peso,
            altura: item.altura,
            largura: item.largura,
            comprimento: item.comprimento,
            tipo: "C",
            produto: item.nomeProduto,
            valor: item.preco,
          };
    
          // Add the Caixa object to the produtos array
          jsonPedido.produtos.push(caixa);
        }
      }
    
      console.log(jsonPedido);

  }
  
  atualizarQuantidade(item: CarrinhoDeCompra, newValue: number): void {
    // Encontre o produto correspondente no array de produtos
    const produtoEncontrado = this.produtos.find((produto) => produto.nome === item.nomeProduto);
    if (produtoEncontrado) {
      // Recupere o carrinho criptografado do sessionStorage
      const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');
      const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

      let carrinhoIds: number[] = [];

      if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
        // Descriptografe o carrinho se ele existir
        const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

        // Verifique se a descriptografia foi bem-sucedida
        if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
          // Converta o resultado descriptografado de volta em um array de IDs
          carrinhoIds = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
        }
      }

      // Calcule a quantidade de IDs para o produto correspondente no carrinho
      const quantidadeDeIds = carrinhoIds.filter((id) => id === produtoEncontrado.prodId).length;

      // Calcule a diferença entre newValue e a quantidade de IDs
      const diff = newValue - quantidadeDeIds;
      // Se a diferença for positiva, adicione IDs ao array
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          carrinhoIds.push(produtoEncontrado.prodId!);
        }
      } else if (diff < 0) { // Se a diferença for negativa, remova IDs do array
        for (let i = 0; i < -diff; i++) {
          const indexToRemove = carrinhoIds.lastIndexOf(produtoEncontrado.prodId!);
          if (indexToRemove !== -1) {
            carrinhoIds.splice(indexToRemove, 1);
          }
        }
      }
      // Atualize o sessionStorage com o novo array de IDs
      sessionStorage.setItem('c', AES.encrypt(JSON.stringify(carrinhoIds), a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb).toString());

      // Atualize a quantidade no item do carrinho
      item.quantidade = newValue;
      // Recalcule o valor total
      this.calcularValorTotal();
      this.atualizarFrete()
    }
  }

  navegarPagamento(){

    const enderecoSelecionado = this.enderecoSelecionado.endId;
    const d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2 = '9776a1b50191cae98292336600e0a7bd4263bf18b3d87c7dbb5cb3dd7f54438f';

    // Criptografe o endereço selecionado
    const a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6 = AES.encrypt(enderecoSelecionado.toString(), d880c83d159fd83056bf415dc345fdcbd5c642e26ca51703af13bc9db17838d2).toString();

    // Armazene o valor criptografado no sessionStorage
    sessionStorage.setItem('es', a8b12ace84b6e44cf9290c7a8d584d0f44a4ff2079add964f67e6e999e0045d6);

    this.router.navigate(['/pagamento']);
  }

  onPageChange(event: any): void {
    this.firstProduto = event.first;
    this.rowsProduto = event.rows;
  }

  onPageChangeEnderecos(event: any): void {
    this.firstEndereco = event.first;
    this.rowsEndereco = event.rows;
  }

  calcularValorTotal(): void {
    this.valorTotal = this.carrinho.reduce((total, produto) => {
      return total + (produto.preco || 0) * (produto.quantidade || 0);
    }, 0);
  }

  calcularValorItem(item: CarrinhoDeCompra): number {
    return (item.quantidade || 0) * (item.preco || 0);
  }

  atualizarValorTotal(): void {
    this.calcularValorTotal();
  }

  excluirItem(item: CarrinhoDeCompra): void {
    const index = this.carrinho.indexOf(item);
    if (index !== -1) {
      const produtoId = this.produtos.find((produto) => produto.nome === item.nomeProduto)?.prodId;
      if (produtoId) {
        this.removeProdutoDoSessionStorage(produtoId);
      }

      // Remove todos os itens correspondentes ao produto do carrinho
      this.carrinho = this.carrinho.filter((carrinhoItem) => carrinhoItem.nomeProduto !== item.nomeProduto);

      this.calcularValorTotal();
    }
  }

  removeProdutoDoSessionStorage(produtoId: number): void {
    const a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5 = sessionStorage.getItem('c');
    const a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb = 'a3961c51c8a8dca7ae4cd0a4e66a99259ca12dc3144b550efb34ebc8dfb6ecbc';

    let carrinhoIds: number[] = [];

    if (a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5) {
      // Descriptografe o carrinho se ele existir
      const a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a = AES.decrypt(a197524e8eab13c5ef3ce02dd4f4b8cf6972d7b9154604e3f55b3cdcd0e4c2d5, a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb);

      // Verifique se a descriptografia foi bem-sucedida
      if (a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.sigBytes > 0) {
        // Converta o resultado descriptografado de volta em um array de IDs
        carrinhoIds = JSON.parse(a3a61a64a53903b8b315bb3a98a680213b415430c83844e6872d1b332ad2a27a.toString(CryptoJS.enc.Utf8));
      }
    }

    // Remova todos os IDs correspondentes ao produto do array
    carrinhoIds = carrinhoIds.filter((id) => id !== produtoId);

    // Atualize o sessionStorage com o novo array de IDs criptografado
    sessionStorage.setItem('c', AES.encrypt(JSON.stringify(carrinhoIds), a1ccefeb85a70e1b7d5c9a481670ce830808a393e93472c6265a397022997bcb).toString());

    const tipo = 'success'
    const titulo = ''
    const mensagem = 'Produto removido do carrinho.'
    const icon = 'fa-solid fa-check'

    this.appToast.toast(tipo, titulo, mensagem, icon);
  }

  removerTodosOsProdutos() {
    this.carrinho = []; // Limpa o array de carrinho para remover todos os produtos
    sessionStorage.removeItem('c');
    sessionStorage.removeItem('p');

    const tipo = 'success'
    const titulo = ''
    const mensagem = 'Todos produtos removidos do carrinho.'
    const icon = 'fa-solid fa-check'

    this.appToast.toast(tipo, titulo, mensagem, icon);
  }

  formatarNomeProduto(produtos: string): string {
    return this.categoriasService.formatarNomeProduto(produtos);
  }

  get totalRecords(): number {
    return this.carrinho?.length || 0;
  }

  get totalRecordsEnderecos(): number {
    return this.enderecosEntrega?.length || 0;
  }

  getImagemProduto(item: any): string {
    const imagensProduto = this.getImagensProduto(item);
    const primeiraImagem = imagensProduto.length > 0 ? imagensProduto[0] : null;
  
    return primeiraImagem ? this.getImagemURL(primeiraImagem) : ''; // Retorna a URL da primeira imagem ou uma string vazia se não houver imagem.
  }
  
  getImagensProduto(produto: any): any[] {
    const idProduto = produto.prodId;
    return this.tipo1Fotos.filter((foto) => foto.prodId === idProduto);
  }
  
  getImagemURL(imagem: any): string {
    const url = this.urlGlobal.url;
    const endpoint = 'fotos/';
    return `${url}${endpoint}${imagem.imgfomulacao}`;
  }

}
