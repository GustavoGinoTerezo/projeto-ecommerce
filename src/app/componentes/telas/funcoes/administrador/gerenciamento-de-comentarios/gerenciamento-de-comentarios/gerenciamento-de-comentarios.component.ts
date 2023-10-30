import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
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
    private appToast: AppComponent,
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
      
      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Comentário aprovado com sucesso.'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);

      // Encontre o índice do comentário no array e remova-o
      const index = this.produtosComComentariosPendentes.findIndex(item => item.comentarioId === comentarioId);
      if (index !== -1) {
        this.produtosComComentariosPendentes.splice(index, 1);
      }
    },
    (error) => {
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro ao aprovar comentário.'
      const icon = 'fa-solid fa-face-frown'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    })
  }

  rejeitarComentario(comentario: any) {
    
    const comentarioId = comentario.comentarioId

    this.comentariosAPIService.excluirComentario(comentarioId).subscribe((response) => {
      
      const tipo = 'success'
      const titulo = ''
      const mensagem = 'Comentário rejeitado para o produto.'
      const icon = 'fa-solid fa-check'

      this.appToast.toast(tipo, titulo, mensagem, icon);

      const index = this.produtosComComentariosPendentes.findIndex(item => item.comentarioId === comentarioId);
      if (index !== -1) {
        this.produtosComComentariosPendentes.splice(index, 1);
      }
    },
    (error) => {
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro ao rejeitar o comentário.'
      const icon = 'fa-solid fa-face-frown'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    })
  }

}
