import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produtos, ServiceCategoriasService, ComentariosProdutos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { Comentarios, ServiceComentariosService } from 'src/app/services/serviceComentarios/service-comentarios.service';
import { ServiceApiComentariosService } from 'src/app/services/servicesAPI/serviceAPI-Comentarios/service-api-comentarios.service';

@Component({
  selector: 'app-gerenciamento-de-comentarios',
  templateUrl: './gerenciamento-de-comentarios.component.html',
  styleUrls: ['./gerenciamento-de-comentarios.component.css']
})
export class GerenciamentoDeComentariosComponent  {

  private comentariosSubscription!: Subscription;

  produtosComComentariosPendentes: any[] = [];
  comentariosCarregados: boolean = false; // Controle adicional
  comentariosAPI: Comentarios[] = []

  constructor(
    private comentariosService: ServiceComentariosService,
    private comentariosAPIService: ServiceApiComentariosService,
    ) {}

  ngOnInit() {
    

    // this.carregarComentariosAPI();

    
  }

  ngOnDestroy() {

    if (this.comentariosSubscription) {
      this.comentariosSubscription.unsubscribe();
    }

  }

  async carregarComentariosAPI() {
    await this.comentariosService.atualizarComentariosDaAPI();
    await this.carregarComentarios();
  }

  async carregarComentarios() {
    this.comentariosSubscription = this.comentariosService.getComentarios().subscribe((comentariosAPI) => {
      this.produtosComComentariosPendentes = comentariosAPI.filter(comentario => comentario.aprovado === 0);
      this.comentariosCarregados = true;
    });
  }

  aprovarComentario(comentario: any) {
  
    const comentarioId = comentario.comentarioId

    const comentarioAprovado = {
      aprovado: "1"
    }

    this.comentariosAPIService.atualizarComentario(comentarioId, comentarioAprovado).subscribe((response) => {
      console.log("Comentário aprovado com sucesso", response);
      // Encontre o índice do comentário no array e remova-o
      const index = this.produtosComComentariosPendentes.findIndex(item => item.comentarioId === comentarioId);
      if (index !== -1) {
        this.produtosComComentariosPendentes.splice(index, 1);
      }
    },
    (error) => {
      console.log("Erro ao aprovar comentário", error);
    })
  }


  // Função para rejeitar um comentário
  rejeitarComentario(comentario: any) {
    
    const comentarioId = comentario.comentarioId

    this.comentariosAPIService.excluirComentario(comentarioId).subscribe((response) => {
      console.log("Comentário excluído com sucesso", response)
      const index = this.produtosComComentariosPendentes.findIndex(item => item.comentarioId === comentarioId);
      if (index !== -1) {
        this.produtosComComentariosPendentes.splice(index, 1);
      }
    },
    (error) => {
      console.log("Erro ao excluir comentário", error)
    })
  }

}
