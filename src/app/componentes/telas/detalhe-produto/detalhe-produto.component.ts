import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceCarrinhoDeComprasService } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, Imagens, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

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
        this.nomeProduto = params['nome'];

        if (this.nomeProduto) {
          const nomeOriginal = this.nomeProduto.replace(/-/g, ' ');
          this.produto = this.produtoService.obterProdutoPorNome(nomeOriginal);

          this.nomeProdutoFormatado = this.produtoService.formatarNomeProduto(this.nomeProduto);
        }
      })

    }, 1000)

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
    this.carrinhoService.adicionarAoCarrinho(produto);
    this.showProdutoAdicionadoAoCarrinho();
  }

  showProdutoAdicionadoAoCarrinho() {
    this.messageService.add({
      severity: 'success',
      icon: 'pi pi-shopping-cart',
      detail: 'Produto adicionado ao carrinho!' });
  }

  adicionarComentario() {
    // Verifique se o novoComentario não está vazio
    if (!this.novoComentario.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Digite um comentário.' });
      return;
    }

    // Adicione o comentário pendente ao array de comentários pendentes do produto
    if (this.produto) {
      if (!this.produto.comentariosPendentes) {
        this.produto.comentariosPendentes = [];
      }

      this.produto.comentariosPendentes.push({ comentario: this.novoComentario });
    }

    // Limpe o campo de entrada
    this.novoComentario = '';
  }

}


