import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ServiceCaixaService } from 'src/app/services/serviceCaixa/service-caixa.service';
import { ServiceApiCaixaService } from 'src/app/services/servicesAPI/serviceAPI-Caixa/service-api-caixa.service';

@Component({
  selector: 'app-gerenciamento-de-caixas',
  templateUrl: './gerenciamento-de-caixas.component.html',
  styleUrls: ['./gerenciamento-de-caixas.component.css']
})
export class GerenciamentoDeCaixasComponent {

  private caixasSubscription!: Subscription;
  
  @ViewChild('dt') table!: Table;
  caixaId!: number;
  nomeCaixa!: string;
  peso!: number | null;
  altura!: number | null;
  largura!: number | null;
  comprimento!: number | null;

  caixas: any[] = []
  caixaSelecionada: any[] = []

  ativarBotoes: boolean = false

  constructor(
    private caixasService: ServiceCaixaService,
    private caixasAPIService: ServiceApiCaixaService,
  ){}

  ngOnInit(){

    // this.carregarCaixasAPI()

  }

  ngOnDestroy() {

    if (this.caixasSubscription) {
      this.caixasSubscription.unsubscribe();
    }

  }

  async carregarCaixasAPI() {
    await this.caixasService.atualizarCaixasDaAPI();
    this.carregarCaixas();
  }

  carregarCaixas() {
    this.caixasSubscription = this.caixasService.getCaixas().subscribe((caixasAPI) => {
      this.caixas = caixasAPI;
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedCharacters = /[0-9.]/; // Permitir números e ponto (.)
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  cadastrarCaixa(){

    const dataCaixa = {
      nome: this.nomeCaixa,
      altura: this.altura,
      largura: this.largura,
      peso: this.peso,
      comprimento: this.comprimento,
    }

    this.caixasAPIService.cadastrarCaixa(dataCaixa).subscribe(
      (response) => {
        console.log("Caixa adicionada com sucesso", response)
        this.atualizarPagina();
      },
      (error) => {
        console.log("Erro ao cadastrar caixa", error)
      }
    )
  }

  atualizarCaixa(){

    const caixaId = this.caixaId

    const atualizarDataCaixa = {
      nome: this.nomeCaixa,
      altura: this.altura,
      largura: this.largura,
      peso: this.peso,
      comprimento: this.comprimento,
    }

    this.caixasAPIService.atualizarCaixa(caixaId, atualizarDataCaixa).subscribe(
      (response) => {
        console.log("Caixa atualizada com sucesso", response);
        this.atualizarPagina();
      },
      (error) => {
        console.error("Erro ao atualizar a Caixa", error)
      }
    );
  }

  excluirCaixa() {

    const caixaId = this.caixaId

    this.caixasAPIService.excluirCaixa(caixaId).subscribe(
      (response) => {
        console.log("Caixa excluída com sucesso", response);
        this.atualizarPagina();
      },
      (error) => {
        console.error("Erro ao excluir a Caixa", error);
      }
    );
  }

  limparCampos(){

    this.nomeCaixa = ''
    this.peso = null
    this.altura = null
    this.largura =  null
    this.comprimento =  null

    this.ativarBotoes = false

  }

  private atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  atualizarCamposComCaixaSelecionada(caixa: any){

    this.caixaId = caixa.CaixaId

    this.nomeCaixa = caixa.nome
    this.peso = caixa.peso
    this.altura = caixa.altura
    this.largura = caixa.largura
    this.comprimento = caixa.comprimento

    this.ativarBotoes = true

  }

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Obtém o valor do campo de pesquisa em minúsculas
    this.table.filter(filterValue, 'nome', 'contains'); // Aplica o filtro na coluna 'nome' que contém o valor
  }
}
