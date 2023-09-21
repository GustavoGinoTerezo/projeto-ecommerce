import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  categoria: Categorias | undefined;
  nomeCategoria: string | null = null;
  categorias: Categorias[] = [];
  first: number = 0; // Primeiro item da página
  rows: number = 8; // Número de itens por página
  produtos: Produtos[] = []
  produtosDaCategoria: Produtos[] = []

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private router: Router,
  ) {}

  ngOnInit() {

    setTimeout(() => {

      this.route.params.subscribe((params) => {
        this.nomeCategoria = params['nome'];

        if (this.nomeCategoria) {
          const nomeOriginal = this.nomeCategoria.replace(/-/g, ' ');
          this.categoria = this.produtoService.obterCategoriaPorNome(nomeOriginal);
        }
      });

      this.categoriasService.getCategorias().subscribe(
        (categoriasAPI) => {
          this.categorias = categoriasAPI;
        }
      );

      this.categoriasService.getProdutos().subscribe(
        (produtosAPI) => {
          this.produtos = produtosAPI
       }
      );

      console.log(this.categoria)
      console.log(this.produtos)

    }, 2000)

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
    this.carrinhoService.adicionarAoCarrinho(produto);
    this.showProdutoAdicionadoAoCarrinho();
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'success',
      icon: 'pi pi-shopping-cart',
      detail: 'Produto adicionado ao carrinho!' });
  }

  formatarNomeProduto(produtos: string): string {
    return this.categoriasService.formatarNomeProduto(produtos);
  }


  get totalRecords(): number {
    return this.categoria?.produtos?.length || 0;
  }
}




