import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ServiceEstadosService, Estado } from 'src/app/services/serviceEstados/service-estados.service';
import { ServiceApiEstadosService } from 'src/app/services/servicesAPI/serviceAPI-Estados/service-api-estados.service';

@Component({
  selector: 'app-gerenciamento-de-estados',
  templateUrl: './gerenciamento-de-estados.component.html',
  styleUrls: ['./gerenciamento-de-estados.component.css']
})
export class GerenciamentoDeEstadosComponent {

  private estadosSubscription!: Subscription;

  estados: Estado[] = []
  estadosFiltrados!: Estado[]
  estadoSelecionado!: any[]
  nomeEstado!: string;
  UfId!: string;
  icms!: number | null;
  desabilitarBotao: boolean = false
  atualizarOuExcluirId: boolean = false

  constructor(
    private serviceEstados: ServiceEstadosService,
    private serviceEstadosAPI: ServiceApiEstadosService,
    private appToast: AppComponent,
  ){}

  ngOnInit(){

    // this.carregarEstadosAPI()

  }

  ngOnDestroy() {

    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
    }

  }

  async carregarEstadosAPI() {
    await this.serviceEstados.atualizarEstadosDaAPI();
    this.carregarEstados();
  }

  carregarEstados() {
    this.estadosSubscription = this.serviceEstados.getEstados().subscribe((estadosAPI) => {
      this.estados = estadosAPI;
      this.estadosFiltrados = this.estados
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedCharacters = /[0-9.]/; // Permitir números e ponto (.)
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateInputFieldsWithSelectedProduct(estado: Estado) {

    this.nomeEstado = estado.nome;
    this.UfId = estado.UfId
    this.icms = estado.icms

    this.desabilitarBotao = true
    this.atualizarOuExcluirId = true

  }

  transformarParaMaiusculas() {
    this.UfId = this.UfId.toUpperCase();
  }

  limparCampos(){

    this.nomeEstado = '';
    this.UfId = ''
    this.icms = null

    this.desabilitarBotao = false
    this.atualizarOuExcluirId = false

  }

  filterTable(event: any) {
    const searchText = event.target.value.toLowerCase();

    if (!searchText) {
      // Se o campo de pesquisa estiver vazio, redefina a lista de estados para a lista original
      this.estados = this.estadosFiltrados;
    } else {
      // Caso contrário, filtre os estados com base no texto de pesquisa no nome ou no UfId
      this.estados = this.estadosFiltrados.filter((estado) =>
        estado.nome!.toLowerCase().includes(searchText) ||
        estado.UfId!.toLowerCase().includes(searchText)
      );
    }
  }

  //==================================================================================================================================//
  // API

  cadastrarEstado(){

    const dataEstado = {
      UfId: this.UfId,
      nome: this.nomeEstado,
      icms: this.icms,
    }

    this.serviceEstadosAPI.cadastrarEstado(dataEstado).subscribe(
      (response) => {
        
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Estado cadastrado com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);


        
      },
      (error) => {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao excluir estado selecionado.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

      }
    )
  }

  atualizarEstado(){

    const atualizarDataEstado = {
      nome: this.nomeEstado,
      icms: this.icms
    }

    this.serviceEstadosAPI.atualizarEstado(this.UfId, atualizarDataEstado).subscribe(
      (response) => {
        
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Estado atualizado com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);

        
      },
      (error) => {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao atualizar o estado selecionado.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

      }
    );
  }

  excluirEstado() {

    this.serviceEstadosAPI.excluirEstado(this.UfId).subscribe(
      (response) => {
        
        const tipo = 'success'
        const titulo = ''
        const mensagem = 'Estado excluído com sucesso.'
        const icon = 'fa-solid fa-check'

        this.appToast.toast(tipo, titulo, mensagem, icon);

        
      },
      (error) => {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'Erro ao atualizar o estado selecionado.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

      }
    );
  }

 
}
