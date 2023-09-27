import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

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

    const encryptedCarrinhoFromStorage = sessionStorage.getItem('c');

    setTimeout(() => {

      const secretKeyCarrinho = 'carrinho';

      let carrinhoIds: number[] = [];

      if (encryptedCarrinhoFromStorage) {
        // Descriptografe o carrinho se ele existir
        const decryptedCarrinho = AES.decrypt(encryptedCarrinhoFromStorage, secretKeyCarrinho);

        // Verifique se a descriptografia foi bem-sucedida
        if (decryptedCarrinho.sigBytes > 0) {
          // Converta o resultado descriptografado de volta em um array de IDs
          carrinhoIds = JSON.parse(decryptedCarrinho.toString(CryptoJS.enc.Utf8));
        }
      }

      // Agora você tem os IDs de produtos descriptografados em 'carrinhoIds'

      this.categoriasService.getProdutos().subscribe(
        (produtosAPI) => {
          this.produtos = produtosAPI;

          // Crie um objeto para manter a contagem de produtos com o mesmo ID
          const carrinhoMap: { [id: number]: CarrinhoDeCompra } = {};

          carrinhoIds.forEach((produtoId: any) => {
            const produtoEncontrado = this.produtos.find((produto) => produto.prodId === produtoId);
            if (produtoEncontrado) {
              // Se o produto já existe no carrinho, aumente a quantidade
              if (carrinhoMap[produtoId]) {
                carrinhoMap[produtoId].quantidade!++;
              } else {
                // Caso contrário, crie um novo item no carrinho
                carrinhoMap[produtoId] = {
                  prodId: produtoEncontrado.prodId,
                  nomeProduto: produtoEncontrado.nome,
                  preco: produtoEncontrado.preco,
                  quantidade: 1, // Defina a quantidade inicial como 1
                };
              }
            }
          });

          // Converta o objeto de carrinho de volta para um array de itens do carrinho
          this.carrinho = Object.values(carrinhoMap);

          this.calcularValorTotal();
        }
      );
    }, 1000);

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
      // Recupere o carrinho criptografado do sessionStorage
      const encryptedCarrinhoFromStorage = sessionStorage.getItem('c');
      const secretKeyCarrinho = 'carrinho';

      let carrinhoIds: number[] = [];

      if (encryptedCarrinhoFromStorage) {
        // Descriptografe o carrinho se ele existir
        const decryptedCarrinho = AES.decrypt(encryptedCarrinhoFromStorage, secretKeyCarrinho);

        // Verifique se a descriptografia foi bem-sucedida
        if (decryptedCarrinho.sigBytes > 0) {
          // Converta o resultado descriptografado de volta em um array de IDs
          carrinhoIds = JSON.parse(decryptedCarrinho.toString(CryptoJS.enc.Utf8));
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
      sessionStorage.setItem('c', AES.encrypt(JSON.stringify(carrinhoIds), secretKeyCarrinho).toString());

      // Atualize a quantidade no item do carrinho
      item.quantidade = newValue;
      // Recalcule o valor total
      this.calcularValorTotal();
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
    const carrinhoIds = JSON.parse(sessionStorage.getItem('c') || '[]');
    const indexesToRemove = carrinhoIds
      .map((id: any, index: any) => (id === produtoId ? index : -1)) // Encontre todos os índices a serem removidos
      .filter((index: number) => index !== -1); // Remova índices inválidos
    // Remova os IDs encontrados na ordem inversa (para não afetar os outros índices)
    indexesToRemove.reverse().forEach((index: any) => carrinhoIds.splice(index, 1));
    sessionStorage.setItem('c', JSON.stringify(carrinhoIds));
  }

  removerTodosOsProdutos() {
    this.carrinho = []; // Limpa o array de carrinho para remover todos os produtos
    sessionStorage.removeItem('c');
    sessionStorage.removeItem('p');
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
