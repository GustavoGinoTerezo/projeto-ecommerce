import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Categorias, ServiceCategoriasService, Produtos, CategoriaVazia, Entrada, Saida } from 'src/app/services/serviceCategorias/service-categorias.service';
import { ServiceEstadosService } from 'src/app/services/serviceEstados/service-estados.service';
import { ServiceFornecedoresService } from 'src/app/services/serviceFornecedores/service-fornecedores.service';
import { ServiceNotaFiscalService } from 'src/app/services/serviceNotaFiscal/service-nota-fiscal.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';
import { ServiceAPICategoriaService } from 'src/app/services/servicesAPI/serviceAPI-Categoria/service-api-categoria.service';
import { ServiceApiFornecedoresService } from 'src/app/services/servicesAPI/serviceAPI-Fornecedores/service-api-fornecedores.service';
import { ServiceApiNotaFiscalService } from 'src/app/services/servicesAPI/serviceAPI-NotaFiscal/service-api-nota-fiscal.service';
import { ServiceAPIProdutoService } from 'src/app/services/servicesAPI/serviceAPI-Produto/service-api-produto.service';

interface City {
  name: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-gerenciamento-de-estoque',
  templateUrl: './gerenciamento-de-estoque.component.html',
  styleUrls: ['./gerenciamento-de-estoque.component.css']
})
export class GerenciamentoDeEstoqueComponent {

  private inicializacaoConcluidaSubscription!: Subscription;
  private produtosSubscription!: Subscription;
  private fornecedoresSubscription!: Subscription;
  private notaFiscalCorpoSubscription!: Subscription;
  private notaFiscalCabecaSubscription!: Subscription;

  @ViewChild('dt') table!: Table;
  @ViewChild('dtNotas') tableNotas!: Table;
  categorias: Categorias[] = [];
  originalQuantEntrada: Entrada[] = [];
  originalQuantSaida: Saida[] = [];
  produtosSelecionados: any[] = []
  quantidadeProdutos: (any | null)[] = [];
  produtos: Produtos[] = []
  numeroNotaFiscal!: string;
  botaoEnviarDesabilitado: boolean = true;
  quantidadePreenchida: { [key: number]: boolean } = {};

  numeroNotaFiscalGerenciamento!: string;
  nfEntradaId!: number | null;

  filtroDataEntrada!: any;

  fornecedores: any[] = [];
  fornecedorSelecionado: any[] = [];
  fornecedorId!: number;

  notaFiscalCorpo: any[] = []
  notaFiscalCabeca: any[] = []

  ativarBotoes: boolean = true

  constructor(
    private categoriasService: ServiceCategoriasService,
    private messageService: MessageService,
    private fornecedoresService: ServiceFornecedoresService,
    private notaFiscalAPIService: ServiceApiNotaFiscalService,
    private produtosAPIService: ServiceAPIProdutoService,
    private notaFiscalService: ServiceNotaFiscalService,
  ){}

  ngOnInit(){

    const start = sessionStorage.getItem('start')

    if(start){
      this.carregarProdutos();
    } else {
      const inicializacaoConcluidaObservable = this.categoriasService.getInicializacaoConcluida();

      if (inicializacaoConcluidaObservable) {
        this.inicializacaoConcluidaSubscription = inicializacaoConcluidaObservable.subscribe(() => {
          this.carregarProdutos();
        });
      }
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('start');
    });

    // this.carregarFornecedoresAPI()

    // this.carregarNotaFiscalCorpoAPI()

    // this.carregarNotaFiscalCabecaAPI()
  }

  ngOnDestroy() {

    if (this.inicializacaoConcluidaSubscription) {
      this.inicializacaoConcluidaSubscription.unsubscribe();
    }

    if (this.produtosSubscription) {
      this.produtosSubscription.unsubscribe();
    }

    if (this.fornecedoresSubscription) {
      this.fornecedoresSubscription.unsubscribe();
    }

    if (this.notaFiscalCorpoSubscription) {
      this.notaFiscalCorpoSubscription.unsubscribe();
    }

    if (this.notaFiscalCabecaSubscription) {
      this.notaFiscalCabecaSubscription.unsubscribe();
    }

  }

  async carregarProdutos() {
    this.produtosSubscription = this.categoriasService.getProdutos().subscribe(async (produtosAPI) => {
      this.produtos = produtosAPI;
    });
  }

  async carregarFornecedoresAPI() {
    await this.fornecedoresService.atualizarFornecedoresDaAPI();
    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.fornecedoresSubscription = this.fornecedoresService.getFornecedores().subscribe((fornecedoresAPI) => {
      this.fornecedores = fornecedoresAPI;
    });
  }

  async carregarNotaFiscalCorpoAPI() {
    await this.notaFiscalService.atualizarNotaFiscalCorpoDaAPI();
    this.carregarNotaFiscalCorpo();
  }

  carregarNotaFiscalCorpo() {
    this.notaFiscalCorpoSubscription = this.notaFiscalService.getNotaFiscalCorpo().subscribe((notaFiscalCorpoAPI) => {
      this.notaFiscalCorpo = notaFiscalCorpoAPI;
    });
  }

  async carregarNotaFiscalCabecaAPI() {
    await this.notaFiscalService.atualizarNotaFiscalCabecaDaAPI();
    this.carregarNotaFiscalCabeca();
  }

  carregarNotaFiscalCabeca() {
    this.notaFiscalCabecaSubscription = this.notaFiscalService.getNotaFiscalCabeca().subscribe((notaFiscalCabecaAPI) => {
      this.notaFiscalCabeca = notaFiscalCabecaAPI;
    });
  }

  getNotasFiscaisCorpoForProduct(prodId: number): any[] {
    return this.notaFiscalCorpo.filter((nota) => nota.prodId === prodId);
  }
  
  formatarData(dataString: string): string {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se de que o mês começa em 0 (janeiro) no JavaScript
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }
  
  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Obtém o valor do campo de pesquisa em minúsculas
    this.table.filter(filterValue, 'nome', 'contains'); // Aplica o filtro na coluna 'nome' que contém o valor
  }

  filterTableNotas(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Obtém o valor do campo de pesquisa em minúsculas
    this.tableNotas.filter(filterValue, 'numeroNota', 'contains'); // Aplica o filtro na coluna 'nome' que contém o valor
  }

  formatCurrency(value: number | null): string {
    if (value !== null) {
      return value.toFixed(2);
    }
    return '';
  }

  calcularSaldo(produto: Produtos): number {
    const entrada = typeof produto.qtdEntrada === 'number' ? produto.qtdEntrada : 0;
    const saida = typeof produto.qtdSaida === 'number' ? produto.qtdSaida : 0;
    return entrada - saida;
  }

  onQuantidadeChange(produto: any, quantidade: any | null, index: number) {
    if (quantidade === "" || isNaN(quantidade as any)) {
      this.quantidadeProdutos[index] = null;
    } else {
      this.quantidadeProdutos[index] = Number(quantidade); // Converta o valor para número
    }

    this.atualizarBotaoEnviar();
  }

  onFornecedorSelect(event: any) {
    this.fornecedorSelecionado = event.value;
    this.fornecedorId = event.value.FornecedorId || '';
  }

  onEnviarEntrada() {
    
      const dataNotaFiscalCabeca = {
        FornecedorId: this.fornecedorId,
        numeroNota: this.numeroNotaFiscal,
      }

      this.notaFiscalAPIService.cadastrarNotaEntradaCabeca(dataNotaFiscalCabeca).subscribe((response) => {
        console.log("Nota Fiscal Cabeça cadastrada com sucesso", response)

        const idNfEntrada = response.NfEntradaID

        for (let i = 0; i < this.produtosSelecionados.length; i++) {
          const produto = this.produtosSelecionados[i];
          const quantidade = this.quantidadeProdutos[i];

        const dataNotaFiscalCorpo = {
          NfEntradaID: idNfEntrada,
          prodId: produto.prodId,
          preco: produto.preco,
          quantidade: quantidade
        }

        this.notaFiscalAPIService.cadastrarNotaEntradaCorpo(dataNotaFiscalCorpo).subscribe((response) => {
          console.log("Nota Fiscal Corpo cadastrada com sucesso", response)

          const dataQuantidadeEntradaProduto = {
            qtdEntrada: produto.qtdEntrada + quantidade
          }

          this.produtosAPIService.atualizarProduto(produto.prodId, dataQuantidadeEntradaProduto).subscribe((response) => {
            console.log("Quantidade do produto atualizada com sucesso", response)
          },
          (error) => {
            console.log("Erro ao atualizar quantidade do produto", error)  
          })
          },
          (error) => {
            console.log("Erro ao cadastrar Nota Fiscal Corpo", error)
          })
        }
      },
      (error) => {
        console.log("Erro ao cadastrar Nota Fiscal Cabeça", error)
      })

    
  }

  atualizarNotaFiscal(){

    const nfId = this.nfEntradaId 

    const dataNovoNumeroNotaFiscal = {
      numeroNota: this.numeroNotaFiscalGerenciamento
    }

    this.notaFiscalAPIService.atualizarNotaEntradaCabeca(nfId, dataNovoNumeroNotaFiscal).subscribe((response) => {
      console.log("NotaFiscalCabeca atualizada com sucesso", response)
    },
    (error) => {
      console.log("Erro ao atualizar NotaFiscalCabeca", error)
    })

  }

  podeExcluirNotaFiscal(): boolean {
    // Verifique se há algum item em notaFiscalCorpo com o mesmo NfEntradaID
    const produtosRelacionados = this.notaFiscalCorpo.filter(item => item.NfEntradaID === this.nfEntradaId);

    // Se não houver produtos relacionados, a nota fiscal pode ser excluída
    return produtosRelacionados.length === 0;
  }

  excluirNotaFiscal() {
    if (this.podeExcluirNotaFiscal()) {
      const nfId = this.nfEntradaId 

      this.notaFiscalAPIService.excluirNotaEntradaCabeca(nfId).subscribe((response) => {
        console.log("NotaFiscalCabeca excluida com sucesso", response)
      },
      (error) => {
        console.log("Erro ao excluir NotaFiscalCabeca", error)
      })
    } else {
      // Se houver produtos relacionados, exiba uma mensagem de erro ou tome a ação apropriada.
      console.log("Não é possível excluir a nota fiscal, pois há produtos relacionados a ela.");
    }
  }

  excluirEntrada(nota: any){
    
    const notaFiscalIdCorpo = nota.NfEntradaCorId
    const prodId = nota.prodId
    const qtdEntrada = nota.Produto.qtdEntrada;

    console.log(qtdEntrada, prodId, notaFiscalIdCorpo)

    this.notaFiscalAPIService.excluirNotaEntradaCorpo(notaFiscalIdCorpo).subscribe((response) => {
      console.log("NotaFiscalCorpo excluído com sucesso", response)

      const dataQuantidadeEntradaProduto = {
        qtdEntrada: qtdEntrada - nota.quantidade
      }

      this.produtosAPIService.atualizarProduto(prodId, dataQuantidadeEntradaProduto).subscribe((response) => {
        console.log("Quantidade do produto atualizada com sucesso", response)
      },
      (error) => {
        console.log("Erro ao atualizar quantidade do produto", error)  
      })

      
    },
    (error) => {
      console.log("Erro ao excluir NotaFiscalCorpo", error)
    })
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/g; // Expressão regular para permitir apenas números
    const inputChar = event.key;
    if (!inputChar.match(allowedChars)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  }

  atualizarBotaoEnviar(): void {
    const produtosSelecionadosVazios = this.quantidadeProdutos.some(qtd => qtd === undefined || qtd === null || qtd === 0);
    // Verificar se todos os campos de quantidade estão preenchidos
    const todosCamposQuantidadePreenchidos = this.produtosSelecionados.every((produto, i) => {
      return this.quantidadeProdutos[i] !== undefined && this.quantidadeProdutos[i] !== null && this.quantidadeProdutos[i] !== 0;
    });
    if(!this.numeroNotaFiscal || !this.produtosSelecionados || this.produtosSelecionados.length === 0 ||
      produtosSelecionadosVazios || !todosCamposQuantidadePreenchidos){
        this.botaoEnviarDesabilitado = true
      }else {
        this.botaoEnviarDesabilitado = false
      }
  }

  atualizarInputComNotaSelecionado (nota: any) {
    
    this.nfEntradaId = nota.NfEntradaID
    this.numeroNotaFiscalGerenciamento = nota.numeroNota

    this.ativarBotoes = false
  }

  limparCampoNotaFiscal(){

    this.nfEntradaId = null;
    this.numeroNotaFiscalGerenciamento = ''

    this.ativarBotoes = true

  }

}
