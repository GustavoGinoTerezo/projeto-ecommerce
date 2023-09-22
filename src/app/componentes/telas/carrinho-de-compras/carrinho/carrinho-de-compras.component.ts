import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';


@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent {


  carrinho: CarrinhoDeCompra[] = [];
  first: number = 0; // Primeiro item da página
  rows: number = 5; // Número de itens por página
  cep!: string;
  quantidade: number = 1;
  items: MenuItem[] = [];
  valorTotal: number = 0;
  produtos: Produtos[] = []

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {

  const carrinhoIds = JSON.parse(sessionStorage.getItem('carrinho') || '[]');

    setTimeout(() => {
      this.categoriasService.getProdutos().subscribe(
        (produtosAPI) => {
          this.produtos = produtosAPI;

          // Mapeie os produtos do carrinho com um objeto para controlar a quantidade
          const carrinhoMap: { [id: number]: CarrinhoDeCompra } = {};

          carrinhoIds.forEach((produtoId: any) => {
            const produtoEncontrado = this.produtos.find((produto) => produto.prodId === produtoId);
            if (produtoEncontrado) {
              // Se o produto já existe no carrinho, aumente a quantidade em vez de adicionar um novo
              if (carrinhoMap[produtoId]) {
                carrinhoMap[produtoId].quantidade!++;
              } else {
                const carrinhoItem: CarrinhoDeCompra = {
                  nomeProduto: produtoEncontrado.nome,
                  preco: produtoEncontrado.preco,
                  quantidade: 1,
                };
                carrinhoMap[produtoId] = carrinhoItem;
              }
            }
          });

          // Converta o mapa de carrinho de volta para um array
          this.carrinho = Object.values(carrinhoMap);
        }
      );

      this.calcularValorTotal();
    }, 1000);

  // this.carrinho = this.carrinhoService.getCarrinhoDeCompra();

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

  atualizarQuantidade(item: CarrinhoDeCompra, newValue: number): void {
    // Encontre o produto correspondente no array de produtos
    const produtoEncontrado = this.produtos.find((produto) => produto.nome === item.nomeProduto);

    if (produtoEncontrado) {
      // Verifique se o novo valor é maior que zero
      if (newValue >= item.quantidade!) {
        // Atualize o valor da quantidade no item do carrinho
        item.quantidade = newValue;

        // Atualize o sessionStorage com os IDs dos produtos no carrinho
        const carrinhoIds = this.carrinho.map((carrinhoItem) =>
          carrinhoItem === item ? produtoEncontrado.prodId : carrinhoItem,
        );

        console.log(produtoEncontrado.prodId)
        console.log(carrinhoIds)




        // Recalcule o valor total
        this.calcularValorTotal();
      }
    }
  }


  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
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
      this.carrinho.splice(index, 1);
      this.calcularValorTotal();
      this.showProdutoAdicionadoAoCarrinho();
    }
  }

  removeProdutoDoSessionStorage(produtoId: any) {
    const carrinhoIds = JSON.parse(sessionStorage.getItem('carrinho') || '[]');
    const indexesToRemove = carrinhoIds
      .map((id: any, index: any) => (id === produtoId ? index : -1)) // Encontre todos os índices a serem removidos
      .filter((index: number) => index !== -1); // Remova índices inválidos
    // Remova os IDs encontrados na ordem inversa (para não afetar os outros índices)
    indexesToRemove.reverse().forEach((index: any) => carrinhoIds.splice(index, 1));
    sessionStorage.setItem('carrinho', JSON.stringify(carrinhoIds));
  }

  removerTodosOsProdutos() {
    this.carrinho = []; // Limpa o array de carrinho para remover todos os produtos
  }

  formatarNomeProduto(produtos: string): string {
    return this.categoriasService.formatarNomeProduto(produtos);
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'error',
      icon: 'pi pi-trash',

      detail: 'Produto removido do carrinho!' });
  }

  get totalRecords(): number {
    return this.carrinho?.length || 0;
  }


}
