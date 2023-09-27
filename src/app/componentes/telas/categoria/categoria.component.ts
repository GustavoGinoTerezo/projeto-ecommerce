import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';

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

    this.route.params.subscribe((params) => {
      this.nomeCategoria = params['nome'];

      if (this.nomeCategoria) {
        const nomeOriginal = this.nomeCategoria.replace(/-/g, ' ');
        this.categoria = this.produtoService.obterCategoriaPorNome(nomeOriginal);

          // FILTRA E MOSTRA OS PRODUTOS DA CATEGORIA CORRESPONDENTE
          this.produtosDaCategoria = this.produtos.filter(produto => produto.catId === this.categoria!.catId);
        }
      });

    }, 1500)

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
    // Recupere o carrinho criptografado do sessionStorage
    const encryptedCarrinhoFromStorage = sessionStorage.getItem('c');
    const secretKeyCarrinho = 'carrinho';

    let carrinho: number[] = [];

    if (encryptedCarrinhoFromStorage) {
      // Descriptografe o carrinho se ele existir
      const decryptedCarrinho = AES.decrypt(encryptedCarrinhoFromStorage, secretKeyCarrinho);

      // Verifique se a descriptografia foi bem-sucedida
      if (decryptedCarrinho.sigBytes > 0) {
        try {
          // Converta o resultado descriptografado de volta em um array
          carrinho = JSON.parse(decryptedCarrinho.toString(CryptoJS.enc.Utf8));
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
      const encryptedCarrinho = AES.encrypt(JSON.stringify(carrinho), secretKeyCarrinho).toString();

      // Salve o carrinho criptografado no sessionStorage
      sessionStorage.setItem('c', encryptedCarrinho);

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

  formatarNomeProduto(produtos: string): string {
    return this.categoriasService.formatarNomeProduto(produtos);
  }

  get totalRecords(): number {
    return this.produtosDaCategoria?.length || 0;
  }
}




