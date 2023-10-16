import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceFornecedoresService } from 'src/app/services/serviceFornecedores/service-fornecedores.service';
import { ServiceApiFornecedoresService } from 'src/app/services/servicesAPI/serviceAPI-Fornecedores/service-api-fornecedores.service';

interface Estado {
  nome: string;
  uf: string;
}


@Component({
  selector: 'app-gerenciamento-de-fornecedores',
  templateUrl: './gerenciamento-de-fornecedores.component.html',
  styleUrls: ['./gerenciamento-de-fornecedores.component.css']
})
export class GerenciamentoDeFornecedoresComponent {

  private fornecedoresSubscription!: Subscription;

  fornecedores: any[] = [];
  fornecedoreSelecionado!: any[]
  fornecedorId!: number;
  
  nomeFornecedor!: string;
  cnpj!: string;
  emailCadastroFornecedor!: string;
  descricaoFornecedor!: string;
  numeroEmpresa!: string;
  inscricaoEstadual!: string;

  cep!: string;
  telefone!:  string;
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroLocal!: number | null;
  emailAlternativo: string = '';
  telefoneAlternativo!: string;
  complemento!: string;

  estado!: Estado[];
  estadoSelecionado: Estado | null = null;

  desabilitarBotao: boolean = true

  constructor(
    private fornecedoresAPIService: ServiceApiFornecedoresService,
    private fornecedoresService: ServiceFornecedoresService
  ){}

  ngOnInit(){

    this.estado = [
      { nome: 'Acre', uf: 'AC'},
      { nome: 'Alagoas', uf: 'AL'},
      { nome: 'Amapá', uf: 'AP'},
      { nome: 'Amazonas', uf: 'AM'},
      { nome: 'Bahia', uf: 'BA'},
      { nome: 'Ceará', uf: 'CE'},
      { nome: 'Distrito Federal', uf: 'DF'},
      { nome: 'Espírito Santo', uf: 'ES'},
      { nome: 'Goiás', uf: 'GO'},
      { nome: 'Maranhão', uf: 'MA'},
      { nome: 'Mato Grosso', uf: 'MT'},
      { nome: 'Mato Grosso do Sul', uf: 'MS'},
      { nome: 'Minas Gerais', uf: 'MG'},
      { nome: 'Pará', uf: 'PA'},
      { nome: 'Paraíba', uf: 'PB'},
      { nome: 'Paraná', uf: 'PR'},
      { nome: 'Pernambuco', uf: 'PE'},
      { nome: 'Piauí', uf: 'PI'},
      { nome: 'Rio de Janeiro', uf: 'RJ'},
      { nome: 'Rio Grande do Norte', uf: 'RN'},
      { nome: 'Rio Grande do Sul', uf: 'RS'},
      { nome: 'Rondônia', uf: 'RO'},
      { nome: 'Roraima', uf: 'RR'},
      { nome: 'Santa Catarina', uf: 'SC'},
      { nome: 'São Paulo', uf: 'SP'},
      { nome: 'Sergipe', uf: 'SE'},
      { nome: 'Tocantins', uf: 'TO'}
    ];
    

    // this.carregarFornecedoresAPI()

  }

  ngOnDestroy() {

    if (this.fornecedoresSubscription) {
      this.fornecedoresSubscription.unsubscribe();
    }

  }

  async carregarFornecedoresAPI() {
    await this.fornecedoresService.atualizarFornecedoresDaAPI();
    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.fornecedoresSubscription = this.fornecedoresService.getFornecedores().subscribe((fornecedoresAPI) => {
      this.fornecedores = fornecedoresAPI;
      console.log(this.fornecedores)
    });
  }

  updateInputFieldsWithSelectedFornecedor(fornecedor: any) {

    this.fornecedorId = fornecedor.FornecedorId

    this.nomeFornecedor = fornecedor.nome;
    this.cnpj = fornecedor.cnpj;
    this.inscricaoEstadual = fornecedor.inscricaoEstadual;
    this.emailCadastroFornecedor = fornecedor.email;
    this.telefone = fornecedor.telefone;
    this.cep = fornecedor.cep;
    this.cidade = fornecedor.cidade;
    this.bairro = fornecedor.bairro;
    this.rua = fornecedor.endereco;
    this.numeroEmpresa = fornecedor.numEmpresa;
    this.descricaoFornecedor = fornecedor.descricao;
    
    
    this.desabilitarBotao = false

  }

  habilitarBotao(): boolean {

    if(
      !this.nomeFornecedor ||
      !this.cnpj ||
      !this.inscricaoEstadual ||
      !this.emailCadastroFornecedor ||
      !this.telefone ||
      !this.cep  ||
      !this.cidade ||
      !this.bairro ||
      !this.rua ||
      !this.numeroEmpresa ||
      !this.descricaoFornecedor ||
      !this.desabilitarBotao
    ){
      return true
    }

    return false
  }

  limparCampos(){

    this.nomeFornecedor = '';
    this.cnpj =  '' ;
    this.inscricaoEstadual = '';
    this.emailCadastroFornecedor = '';
    this.telefone = '';
    this.cep = '';
    this.cidade = '';
    this.bairro = '';
    this.rua = '';
    this.numeroEmpresa = '';
    this.descricaoFornecedor = '';
    this.estadoSelecionado = null;

    this.desabilitarBotao = true
  }

  private atualizarPagina() {
    //RECARREGAR PÁGINA PARA ATUALIZAR VALORES DO ARRAY
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  // ========================================================= //
  // API

  cadastrarFornecedor(){

    const dataFornecedor = {
      endereco: this.rua,
      cidade: this.cidade,
      bairro: this.bairro,
      // UfId: this.estadoSelecionado!.uf,
      inscricaoEstadual: this.inscricaoEstadual,
      cnpj: this.cnpj,
      descricao: this.descricaoFornecedor,
      numEmpresa: this.numeroEmpresa,
      cep: this.cep,
    }
    
    this.fornecedoresAPIService.cadastrarFornecedores(dataFornecedor).subscribe((response) => {
      console.log("Fornecedor cadastrado com sucesso", response)
      this.atualizarPagina()
    }, 
    (error) => {
      console.log("Erro ao cadastrar fornecedor", error)
    })

    

  }

  atualizarFornecedor(){

    const fornecedorId = this.fornecedorId;

    const novoDataFornecedor = {
      endereco: this.rua,
      cidade: this.cidade,
      bairro: this.bairro,
      // UfId: this.estadoSelecionado!.uf,
      inscricaoEstadual: this.inscricaoEstadual,
      cnpj: this.cnpj,
      descricao: this.descricaoFornecedor,
      numEmpresa: this.numeroEmpresa,
      cep: this.cep,
    }

    this.fornecedoresAPIService.atualizarFornecedores(fornecedorId, novoDataFornecedor).subscribe((response) => {
      console.log("Fornecedor atualzado com sucesso", response)
      this.atualizarPagina()
    },
    (error) => {
      console.log("Erro ao atualizar fornecedor", error)
    })

  }

  excluirFornecedor(){

    const fornecedorId = this.fornecedorId;

    this.fornecedoresAPIService.excluirFornecedores(fornecedorId).subscribe((response) => {
      console.log("Fornecedor excluído com sucesso", response)
      this.atualizarPagina()
    },
    (error) => {
      console.log("Erro ao excluir fornecedor", error)
    })
  }

}
