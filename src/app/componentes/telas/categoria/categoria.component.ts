import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorias, Produtos, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  categoria: Categorias | undefined;
  nomeCategoria: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ServiceCategoriasService,
  ) {}


  ngOnInit() {

    //================================================================================================================================//
    //RECEBER OS PARAMETROS DOS PRODUTOS EM DESTAQUE
    this.route.params.subscribe((params) => {
    this.nomeCategoria = params['nome'];

    if (this.nomeCategoria) {
      // Substitua os hífens por espaços para obter o nome original do produto
      const nomeOriginal = this.nomeCategoria.replace(/-/g, ' ');

      // Obter produto dos produtos em destaque
      this.categoria = this.produtoService.obterCategoriaPorNome(nomeOriginal);


    }
    });


  }


}
