import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Estado, ServiceEstadosService } from 'src/app/services/serviceEstados/service-estados.service';
import { ServiceFornecedoresService } from 'src/app/services/serviceFornecedores/service-fornecedores.service';
import { ServiceApiFornecedoresService } from 'src/app/services/servicesAPI/serviceAPI-Fornecedores/service-api-fornecedores.service';

interface EstadoLocal {
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
  private estadosSubscription!: Subscription;

  fornecedores: any[] = [];
  fornecedoreSelecionado!: any[]
  fornecedorId!: number;
  
  nomeFornecedor!: string;
  cnpj!: string;
  descricaoFornecedor!: string;
  numeroEmpresa!: string;
  inscricaoEstadual!: string;

  cep!: string;
  cidade: string = '';
  bairro: string = '';
  rua: string = '';
  numeroLocal!: number | null;
  emailAlternativo: string = '';
  telefoneAlternativo!: string;
  complemento!: string;

  estado!: EstadoLocal[];
  estadoSelecionado: EstadoLocal | null = null;

  desabilitarBotao: boolean = true

  estadosAPI: Estado[] = []

  constructor(
    private fornecedoresAPIService: ServiceApiFornecedoresService,
    private fornecedoresService: ServiceFornecedoresService,
    private serviceEstado: ServiceEstadosService,
    private appToast: AppComponent,
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

    // this.carregarEstadosAPI()

  }

  ngOnDestroy() {

    if (this.fornecedoresSubscription) {
      this.fornecedoresSubscription.unsubscribe();
    }

    
    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
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

  async carregarEstadosAPI() {
    await this.serviceEstado.atualizarEstadosDaAPI();
    this.carregarEstados();
  }

  carregarEstados() {
    this.estadosSubscription = this.serviceEstado.getEstados().subscribe((estadosAPI) => {
      this.estadosAPI = estadosAPI;
      console.log(this.estadosAPI)
    });
  }

  updateInputFieldsWithSelectedFornecedor(fornecedor: any) {

    this.fornecedorId = fornecedor.FornecedorId

    this.nomeFornecedor = fornecedor.nomefornecedor;
    this.cnpj = fornecedor.cnpj;
    this.inscricaoEstadual = fornecedor.inscricaoEstadual;
    this.cep = fornecedor.cep;
    this.cidade = fornecedor.cidade;
    this.bairro = fornecedor.bairro;
    this.rua = fornecedor.endereco;
    this.numeroEmpresa = fornecedor.numEmpresa;
    this.descricaoFornecedor = fornecedor.descricao;
    
    this.estadoSelecionado = this.estado.find(estado => estado.uf === fornecedor.UfId) || null;
    
    this.desabilitarBotao = false

  }

  habilitarBotao(): boolean {

    if(
      !this.nomeFornecedor ||
      !this.cnpj ||
      !this.inscricaoEstadual ||
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

    if (this.estadoSelecionado) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionado!.uf
      );

      if (estadoEncontrado) {
        
        const dataFornecedor = {
          nomefornecedor: this.nomeFornecedor,
          endereco: this.rua,
          cidade: this.cidade,
          bairro: this.bairro,
          UfId: this.estadoSelecionado!.uf,
          inscricaoEstadual: this.inscricaoEstadual,
          cnpj: this.cnpj,
          descricao: this.descricaoFornecedor,
          numEmpresa: this.numeroEmpresa,
          cep: this.cep,
        }
        
        this.fornecedoresAPIService.cadastrarFornecedores(dataFornecedor).subscribe((response) => {
          
          const tipo = 'success'
          const titulo = ''
          const mensagem = 'Fornecedor cadastrado com sucesso.'
          const icon = 'fa-solid fa-check'

          this.appToast.toast(tipo, titulo, mensagem, icon);

          this.atualizarPagina()
        }, 
        (error) => {
          
          const tipo = 'error'
          const titulo = ''
          const mensagem = 'Erro ao cadastrar fornecedor.'
          const icon = 'fa-solid fa-face-frown'

          this.appToast.toast(tipo, titulo, mensagem, icon);

        })

      } else {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'O estado selecionado não está cadastrado no sistema.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);
      }
    }

  }

  atualizarFornecedor(){

    if (this.estadoSelecionado) {
      const estadoEncontrado = this.estadosAPI.find(
        (estado) => estado.UfId === this.estadoSelecionado!.uf
      );

      if (estadoEncontrado) {

        const fornecedorId = this.fornecedorId;

        const novoDataFornecedor = {
          nomefornecedor: this.nomeFornecedor,
          endereco: this.rua,
          cidade: this.cidade,
          bairro: this.bairro,
          UfId: this.estadoSelecionado!.uf,
          inscricaoEstadual: this.inscricaoEstadual,
          cnpj: this.cnpj,
          descricao: this.descricaoFornecedor,
          numEmpresa: this.numeroEmpresa,
          cep: this.cep,
        }

        this.fornecedoresAPIService.atualizarFornecedores(fornecedorId, novoDataFornecedor).subscribe((response) => {
          
          const tipo = 'success'
          const titulo = ''
          const mensagem = 'Fornecedor atualizado com sucesso.'
          const icon = 'fa-solid fa-check'

          this.appToast.toast(tipo, titulo, mensagem, icon);


          this.atualizarPagina()
        },
        (error) => {
          
          const tipo = 'error'
          const titulo = ''
          const mensagem = 'Erro ao atualizar o fornecedor.'
          const icon = 'fa-solid fa-face-frown'

          this.appToast.toast(tipo, titulo, mensagem, icon);

        })

      } else {
        
        const tipo = 'error'
        const titulo = ''
        const mensagem = 'O estado selecionado não está cadastrado no sistema.'
        const icon = 'fa-solid fa-face-frown'

        this.appToast.toast(tipo, titulo, mensagem, icon);

      }
    }

  }

  excluirFornecedor(){

    const fornecedorId = this.fornecedorId;

    this.fornecedoresAPIService.excluirFornecedores(fornecedorId).subscribe((response) => {
      console.log("Fornecedor excluído com sucesso", response)
      this.atualizarPagina()
    },
    (error) => {
      const tipo = 'error'
      const titulo = ''
      const mensagem = 'Erro ao excluir o fornecedor.'
      const icon = 'fa-solid fa-face-frown'

      this.appToast.toast(tipo, titulo, mensagem, icon);
    })
  }

}
