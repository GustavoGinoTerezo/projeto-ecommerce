import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private produtoService: ServiceCategoriasService,
    private categoriasService: ServiceCategoriasService,
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


}


//================================================================================================================================//
    //RECEBER OS PARAMETROS DOS PRODUTOS EM DESTAQUE
    // this.route.params.subscribe((params) => {
    // this.nomeProduto = params['nome'];

    // if (this.nomeProduto) {
    //   // Substitua os hífens por espaços para obter o nome original do produto
    //   const nomeOriginal = this.nomeProduto.replace(/-/g, ' ');

    //   // Obter produto dos produtos em destaque
    //   this.produto = this.produtoService.obterProdutoPorNomeDestaque(nomeOriginal);

    // //================================================================================================================================//
    // //RECEBER OS PARAMETROS DOS PRODUTOS MAIS VENDIDOS
    // // Obter produto dos produtos mais vendidos
    //   const produtoMaisVendido = this.produtoService.obterProdutoPorNomeMaisVendidos(nomeOriginal);

    // // Verificar se o produto foi encontrado nos produtos mais vendidos
    //   if (produtoMaisVendido) {
    //     // Se foi encontrado, atualize o valor do produto
    //     this.produto = produtoMaisVendido;
    //   }

    // //================================================================================================================================//
    // //RECEBER OS PARAMETROS DOS PRODUTOS MAIS VENDIDOS
    // // Obter produto dos produtos mais vendidos
    // const produtoEmPromocao = this.produtoService.obterProdutoPorNomeEmPromocao(nomeOriginal);

    // // Verificar se o produto foi encontrado nos produtos mais vendidos
    //   if (produtoEmPromocao) {
    //     // Se foi encontrado, atualize o valor do produto
    //     this.produto = produtoEmPromocao;
    //   }
    // }
    // });
