import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private serviceEstadosAPI: ServiceApiEstadosService
  ){}

  ngOnInit(){

    this.carregarEstadosAPI()

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
        console.log("Estado adicionado com sucesso", response)
        this.atualizarPagina();
      },
      (error) => {
        console.log("Erro ao cadastrar estado", error)
      }
    )
  }

  atualizarEstado(){

    const atualizarDataEstado = {
      nome: this.nomeEstado,
      icms: this.icms
    }

    const mensagemSucesso = "Categoria atualizada com sucesso."
    const mensagemErro = "Erro ao atualizar a categoria."

    this.serviceEstadosAPI.atualizarEstado(this.UfId, atualizarDataEstado).subscribe(
      (response) => {
        console.log("Estado atualizada com sucesso", response);
        this.atualizarPagina();
      },
      (error) => {
        console.error("Erro ao atualizar o Estado", error)
      }
    );
  }

  excluirEstado() {

    const mensagemSucesso = "Categoria excluída com sucesso."
    const mensagemErro = "Erro ao excluir a categoria."

    this.serviceEstadosAPI.excluirEstado(this.UfId).subscribe(
      (response) => {
        console.log("Estado excluído com sucesso", response);
        this.atualizarPagina();
      },
      (error) => {
        console.error("Erro ao excluir o Estado", error);
      }
    );
  }

  private atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}
