import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
    private carrinhoService: ServiceCarrinhoDeComprasService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.nomeCategoria = params['nome'];

      if (this.nomeCategoria) {
        const nomeOriginal = this.nomeCategoria.replace(/-/g, ' ');
        this.categoria = this.produtoService.obterCategoriaPorNome(nomeOriginal);
      }
    });

    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );
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
  }

  get totalRecords(): number {
    return this.categoria?.produtos?.length || 0;
  }
}




