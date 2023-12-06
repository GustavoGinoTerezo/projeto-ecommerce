import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorias, ServiceCategoriasService } from 'src/app/services/serviceCategorias/service-categorias.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent {

  private categoriasSubscription!: Subscription;
  private inicializacaoConcluidaSubscription!: Subscription;

  categorias: Categorias[] = [];

  async ngOnInit(){

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarCategorias();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarCategorias();
        });
      }
    }

  }

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }

  }
  

  constructor(
    private categoriasService: ServiceCategoriasService,
    private router: Router
  ){

  }

  carregarCategorias() {
    this.categoriasSubscription = this.categoriasService.getCategorias().subscribe((categoriasAPI) => {
      this.categorias = this.shuffleArray(categoriasAPI).slice(0, 3);
    });
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  navigateCategoria(categoria: Categorias) {
    const nomeFormatado = categoria.nome?.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/categoria', nomeFormatado]);
  }

}
