import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent {

  produto: Produtos | undefined;
  nomeProduto: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ServiceCategoriasService
  ) {}

  ngOnInit() {
    //================================================================================================================================//
    //RECEBER OS PARAMETROS DOS PRODUTOS EM DESTAQUE
    this.route.params.subscribe((params) => {
    this.nomeProduto = params['nome'];

    if (this.nomeProduto) {
      // Substitua os hífens por espaços para obter o nome original do produto
      const nomeOriginal = this.nomeProduto.replace(/-/g, ' ');

      // Obter produto dos produtos em destaque
      this.produto = this.produtoService.obterProdutoPorNomeDestaque(nomeOriginal);

    //================================================================================================================================//
    //RECEBER OS PARAMETROS DOS PRODUTOS MAIS VENDIDOS
    // Obter produto dos produtos mais vendidos
      const produtoMaisVendido = this.produtoService.obterProdutoPorNomeMaisVendidos(nomeOriginal);

    // Verificar se o produto foi encontrado nos produtos mais vendidos
      if (produtoMaisVendido) {
        // Se foi encontrado, atualize o valor do produto
        this.produto = produtoMaisVendido;
      }

    //================================================================================================================================//
    //RECEBER OS PARAMETROS DOS PRODUTOS MAIS VENDIDOS
    // Obter produto dos produtos mais vendidos
    const produtoEmPromocao = this.produtoService.obterProdutoPorNomeEmPromocao(nomeOriginal);

    // Verificar se o produto foi encontrado nos produtos mais vendidos
      if (produtoEmPromocao) {
        // Se foi encontrado, atualize o valor do produto
        this.produto = produtoEmPromocao;
      }
    }
    });




  }




}
