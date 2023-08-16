import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarrinhoDeCompra, ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent {


  carrinho: CarrinhoDeCompra[] = [];
  first: number = 0; // Primeiro item da página
  rows: number = 10; // Número de itens por página
  cep!: string;
  quantidade: number = 1;

  constructor(
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getCarrinhoDeCompra();
    this.calcularValorTotal();
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  calcularValorTotal(): number {
    let total = 0;
    for (const item of this.carrinho) {
      total += (item.quantidade || 0) * (item.preco || 0);
    }
    return total;
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
      this.carrinho.splice(index, 1);
    }
    this.showProdutoAdicionadoAoCarrinho();
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
