import { Component } from '@angular/core';
import { Produtos, ServiceCategoriasService, ComentariosProdutos } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-gerenciamento-de-comentarios',
  templateUrl: './gerenciamento-de-comentarios.component.html',
  styleUrls: ['./gerenciamento-de-comentarios.component.css']
})
export class GerenciamentoDeComentariosComponent  {

  produtosComComentariosPendentes: Produtos[] = [];
  lista: boolean = true;
  comentariosCarregados: boolean = false; // Controle adicional

  constructor(private produtoService: ServiceCategoriasService) {}

  ngOnInit() {
    // Obtém produtos com comentários pendentes
    this.produtoService.getProdutosComComentariosPendentes().subscribe(produtos => {
      this.produtosComComentariosPendentes = produtos;
      this.comentariosCarregados = true; // Marca os comentários como carregados
      this.atualizarLista();
    });
  }

  aprovarComentario(produto: Produtos, comentario: ComentariosProdutos) {
    const index = produto.comentariosPendentes?.indexOf(comentario);
    if (index !== undefined && index !== -1) {
      produto.comentariosPendentes?.splice(index, 1);
      produto.comentariosProduto?.push(comentario);
    }

    // Verificar se há comentários pendentes em todos os produtos
    const hasPendingComments = this.produtosComComentariosPendentes.some(p => p.comentariosPendentes?.length! > 0);

    // Definir this.lista como false se não houver mais comentários pendentes
    if (!hasPendingComments) {
      this.lista = false;
    }

    this.atualizarLista();
  }


  // Função para rejeitar um comentário
  rejeitarComentario(produto: Produtos, comentario: ComentariosProdutos) {
    const index = produto.comentariosPendentes?.indexOf(comentario);
    if (index !== undefined && index !== -1) {
      produto.comentariosPendentes?.splice(index, 1);
    }

    // Verificar se há comentários pendentes em todos os produtos
    const hasPendingComments = this.produtosComComentariosPendentes.some(p => p.comentariosPendentes?.length! > 0);

    // Definir this.lista como false se não houver mais comentários pendentes
    if (!hasPendingComments) {
      this.lista = false;
    }

    this.atualizarLista();
  }

  private atualizarLista() {
    // Definir this.lista com base no controle de comentários carregados
    this.lista = this.comentariosCarregados && this.produtosComComentariosPendentes.some(p => p.comentariosPendentes?.length! > 0);
  }
}
