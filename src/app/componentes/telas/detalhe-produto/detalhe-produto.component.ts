import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produtos, ServiceProdutosService } from 'src/app/services/serviceProdutos/service-produtos.service';

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
    private produtoService: ServiceProdutosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.nomeProduto = params['nome'];

      if (this.nomeProduto) {
        // Substitua os hífens por espaços para obter o nome original do produto
        const nomeOriginal = this.nomeProduto.replace(/-/g, ' ');
        this.produto = this.produtoService.obterProdutoPorNome(nomeOriginal);
      }
    });
  }



}
