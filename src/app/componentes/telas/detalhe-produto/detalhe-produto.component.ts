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
  produto: Produtos | undefined;
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
    // console.log("Iniciando ngOnInit");
    this.categoriasService.getCategorias().subscribe(
      (categorias) => {
        // console.log("Categorias obtidas:", categorias);
        this.categorias = categorias;
        this.route.params.subscribe((params) => {
          const nomeProduto = params['nome'];
          // console.log("Nome do produto na URL:", nomeProduto);

          if (nomeProduto) {
            this.produto = this.encontrarProdutoPorNome(nomeProduto);
            // console.log("Produto encontrado:", this.produto);

            // Formatar o nome do produto para exibição
            this.nomeProdutoFormatado = this.produtoService.formatarNomeProduto(nomeProduto);
          }
        });
      }
    );
  }

  encontrarProdutoPorNome(nomeProduto: string): Produtos | undefined {
    // console.log("Procurando produto por nome:", nomeProduto);
    const nomeProdutoLowerCase = nomeProduto.toLowerCase();

    for (const categoria of this.categorias) {
      const produtoEncontrado = categoria.produtos?.find(
        produto => produto.nome?.toLowerCase() === nomeProdutoLowerCase
      );
      if (produtoEncontrado) {
        // console.log("Produto encontrado nas categorias:", produtoEncontrado);
        return produtoEncontrado;
      }
    }

    // console.log("Produto não encontrado nas categorias");
    return undefined;
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


