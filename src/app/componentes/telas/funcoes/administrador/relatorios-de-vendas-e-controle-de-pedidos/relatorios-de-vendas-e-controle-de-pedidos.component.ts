import { Component } from '@angular/core';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 
import { Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';
import { Subscription } from 'rxjs';
import { ServiceApiCaixaService } from 'src/app/services/servicesAPI/serviceAPI-Caixa/service-api-caixa.service';
import { ServiceCaixaService } from 'src/app/services/serviceCaixa/service-caixa.service';

interface Caixa {
  peso: number;
  altura: number;
  largura: number;
  comprimento: number;
  tipo: string;
  produto: string;
  valor: number;
  quantidade: number;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface TipoVolume {
  tipo: string;
  caracter: string;
}

interface EstadoLocal {
  nome: string;
  uf: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-relatorios-de-vendas-e-controle-de-pedidos',
  templateUrl: './relatorios-de-vendas-e-controle-de-pedidos.component.html',
  styleUrls: ['./relatorios-de-vendas-e-controle-de-pedidos.component.css']
})
export class RelatoriosDeVendasEControleDePedidosComponent {

  private caixasSubscription!: Subscription;

  pedidos!: Pedido[];
  carrinho: CarrinhoDeCompra[] = [];
  cols: Column[] = [
    { field: 'numeroPedido', header: 'Nº do pedido', customExportHeader: 'Nº do pedido' },
    { field: 'dataPedido', header: 'Data da compra', customExportHeader: 'Data da compra' },
    { field: 'valorTotalDaCompra', header: 'Valor total da compra', customExportHeader: 'Valor total da compra' },
    { field: 'FormaPagamento', header: 'Forma de pagamento', customExportHeader: 'Forma de pagamento' }
  ];
  exportColumns!: ExportColumn[];
  exportColumnsProdutos: ExportColumn[] = [
    { title: 'Nome do produto', dataKey: 'nomeProduto' },
    { title: 'Quantidade solicitada', dataKey: 'quantidade' },
    { title: 'Preço unitário', dataKey: 'precoUnitario' },
    { title: 'Total do produto', dataKey: 'totalProduto' },
  ];
  visibleNotaFiscal: boolean = false;
  visibleTransportadora: boolean = true;
  selectedProductImages: any[] = [];
  numeroDoPedido!: string;
  numeroNotaFiscal!: number

  tipoPedido!: any[];
  tipoPedidoSelecionado: any | null = null;

  valorMercadoria!: number | null;
  pesoMercadoria!: number | null;

  chaveNf!: string;
  numeroNf!: string;
  serieNf!: string;

  nomeCliente!: string;
  cpfOuCnpj!: string;
  telefone!: string;
  email!: string;

  pessoaFisica!: boolean
  pessoaJuridica!: boolean

  logradouro!: string;
  numero!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;

  estado!: EstadoLocal[];
  estadoSelecionado: EstadoLocal | null = null;

  quantidadeCaixas!: number;

  caixaValues: string[] = [];

  pesoVolume: (any | null)[] = [];
  alturaVolume: (any | null)[] = [];
  larguraVolume: (any | null)[] = [];
  compVolume: (any | null)[] = [];
  nomeConteudoVolume: (any | null)[] = [];
  valorConteudoVolume: (any | null)[] = [];

  tipoVolume!: TipoVolume[]
  tipoVolumeSelecionado: TipoVolume[] = [];

  caixas: any[] = []
  caixaSelecionada: any[] = []

  constructor(
    private pedidoService: ServicePedidoService,
    private usuarioService: ServiceUsuariosService,
    private caixasService: ServiceCaixaService,
    ) {}

  ngOnInit() {
    
    // this.carregarCaixasAPI()

    this.tipoPedido = [
      {
        nome: "Declaração",
        tipo: "D"
      },
      {
        nome: "Nota fiscal",
        tipo: "N"
      }
    ];

    this.tipoVolume = [
      {
        tipo: 'Caixa',
        caracter: 'C'
      },
      {
        tipo: 'Envelope',
        caracter: 'E'
      }
    ]

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
    
    this.pedidos = this.pedidoService.getPedido();

    this.exportColumns = this.cols.map((col) => ({ title: col.customExportHeader || col.header, dataKey: col.field }));

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

  filterTable(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.pedidos = this.pedidoService.getPedido().filter((pedido) =>
      pedido.numeroPedido.toString().toLowerCase().includes(filterValue) ||
      pedido.dataPedido.toString().toLowerCase().includes(filterValue) ||
      pedido.valorTotal?.toString().toLowerCase().includes(filterValue) ||
      pedido.formaDoPagamento?.some(fp => fp.tipoPagamento.toLowerCase().includes(filterValue))
    );
  }

  calcularValorTotal(pedido: Pedido): number {
    let total = 0;
    if (pedido.carrinhoDeCompra) {
      for (const item of pedido.carrinhoDeCompra) {
        total += this.calcularValorItem(item);
      }
    }
    return total;
  }

  calcularValorItem(item: CarrinhoDeCompra): number {
    return (item.quantidade || 0) * (item.preco || 0);
  }

  generateExportData(pedidos: Pedido[]): any[] {
    const exportData: any[] = [];

    for (const pedido of pedidos) {
      const exportItem: any = {
        numeroPedido: pedido.numeroPedido,
        dataPedido: pedido.dataPedido,
        valorTotalDaCompra: this.calcularValorTotal(pedido),
        FormaPagamento: pedido.formaDoPagamento?.map(fp => fp.tipoPagamento).join(', '),
        produtos: [] // Array para armazenar os detalhes dos produtos
      };

      // Adicione informações do cliente se disponíveis
      if (pedido.idUsuario !== undefined) {
        // Adicione informações do cliente se disponíveis
        const usuario = this.getUsuarioPorId(pedido.idUsuario);

        if (usuario) {
          exportItem.nomeCliente = usuario.nome || '';
          exportItem.emailCliente = usuario.emailprinc || '';
          exportItem.telefoneCliente = usuario.telefone || '';
          exportItem.cpfCnpjCliente = usuario.cpfOuCnpj || '';
        } else {
          exportItem.nomeCliente = '';
          exportItem.emailCliente = '';
          exportItem.telefoneCliente = '';
          exportItem.cpfCnpjCliente = '';
        }
        } else {

        }

      // Adicione informações do endereço se disponíveis
      if (pedido.enderecoSelecionado) {
        exportItem.cepCliente = pedido.enderecoSelecionado.length > 0 ? pedido.enderecoSelecionado[0].cep || '' : '';
        exportItem.cidadeCliente = pedido.enderecoSelecionado[0].cidade || '';
        exportItem.bairroCliente = pedido.enderecoSelecionado[0].bairro || '';
        exportItem.ruaCliente = pedido.enderecoSelecionado[0].endereco || '';
      } else {
        exportItem.cepCliente = '';
        exportItem.cidadeCliente = '';
        exportItem.bairroCliente = '';
        exportItem.ruaCliente = '';
      }

      if (pedido.carrinhoDeCompra) {
        for (const item of pedido.carrinhoDeCompra) {
          const produtoItem: any = {
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoUnitario: item.preco,
            totalProduto: this.calcularValorItem(item)
          };
          exportItem.produtos.push(produtoItem); // Adicione os detalhes do produto ao array de produtos
        }
      }

      exportData.push(exportItem);
    }

    return exportData;
  }

  exportPdfUnique(pedido?: Pedido) {
    const doc = new jsPDF();
    const columns = this.exportColumns.map(col => col.title);
    const exportData = pedido ? this.generateExportData([pedido]) : this.generateExportData(this.pedidos);

    for (let i = 0; i < exportData.length; i++) {
      if (i > 0) {
        // Adicione uma linha horizontal entre os pedidos
        (doc as any).autoTable({
          styles: { halign: 'center' },
          margin: { top: 10 },
          tableWidth: 'wrap',
          head: [['']],
          body: [['']],
        });
      }

      const pedidoItem = exportData[i];
      (doc as any).autoTable({
        head: [columns],
        body: [this.exportColumns.map(col => pedidoItem[col.dataKey])],
      });

      // Verifique se há detalhes de produtos e renderize-os abaixo do pedido
      if (pedidoItem.produtos && pedidoItem.produtos.length > 0) {
        const columnsProdutos = this.exportColumnsProdutos.map(col => col.title);

        const produtosRows = pedidoItem.produtos.map((produto: any) => {
          return this.exportColumnsProdutos.map(col => produto[col.dataKey]);
        });

        (doc as any).autoTable({
          head: [columnsProdutos],
          body: produtosRows,
        });
      }

      // Adicione informações do cliente
      const clienteColumns = ['Nome do cliente', 'Email', 'Telefone', 'CPF/CNPJ'];
      const clienteData = [
        pedidoItem.nomeCliente,
        pedidoItem.emailCliente,
        pedidoItem.telefoneCliente,
        pedidoItem.cpfCnpjCliente,
      ];

      (doc as any).autoTable({
        head: [clienteColumns],
        body: [clienteData],
      });

      // Adicione informações do endereço
      const enderecoColumns = ['CEP', 'Cidade', 'Bairro', 'Rua'];
      const enderecoData = [
        pedidoItem.cepCliente,
        pedidoItem.cidadeCliente,
        pedidoItem.bairroCliente,
        pedidoItem.ruaCliente,
      ];

      (doc as any).autoTable({
        head: [enderecoColumns],
        body: [enderecoData],
      });
    }

    const fileName = pedido ? `pedido_${pedido.numeroPedido}.pdf` : 'pedidos.pdf';
    doc.save(fileName);
  }

  exportPdfAll() {
    const doc = new jsPDF();
    const exportData = this.generateExportData(this.pedidos);

    for (let i = 0; i < exportData.length; i++) {

      const pedidoItem = exportData[i];

      // Adicione informações do pedido
      const columns = this.exportColumns.map(col => col.title);
      (doc as any).autoTable({
        head: [columns],
        body: [this.exportColumns.map(col => pedidoItem[col.dataKey])],
      });

      // Adicione informações do cliente
      const clienteColumns = ['Nome do cliente', 'Email', 'Telefone', 'CPF/CNPJ'];
      const clienteData = [
        pedidoItem.nomeCliente,
        pedidoItem.emailCliente,
        pedidoItem.telefoneCliente,
        pedidoItem.cpfCnpjCliente,
      ];

      (doc as any).autoTable({
        head: [clienteColumns],
        body: [clienteData],
      });

      // Adicione informações do endereço
      const enderecoColumns = ['CEP', 'Cidade', 'Bairro', 'Rua'];
      const enderecoData = [
        pedidoItem.cepCliente,
        pedidoItem.cidadeCliente,
        pedidoItem.bairroCliente,
        pedidoItem.ruaCliente,
      ];

      (doc as any).autoTable({
        head: [enderecoColumns],
        body: [enderecoData],
      });

      // Verifique se há detalhes de produtos e renderize-os abaixo do pedido
      if (pedidoItem.produtos && pedidoItem.produtos.length > 0) {
        const columnsProdutos = this.exportColumnsProdutos.map(col => col.title);

        const produtosRows = pedidoItem.produtos.map((produto: any) => {
          return this.exportColumnsProdutos.map(col => produto[col.dataKey]);
        });

        (doc as any).autoTable({
          head: [columnsProdutos],
          body: produtosRows,
        });
      }

      // Adicione uma linha horizontal entre as informações do cliente e do endereço
      (doc as any).autoTable({
        styles: { halign: 'center' },
        margin: { top: 10 },
        tableWidth: 'wrap',
        head: [['']],
        body: [['']],
      });
    }

    doc.save('pedidos.pdf');
  }

  showDialogNotaFiscal(numeroPedido: string) {
    this.numeroDoPedido = numeroPedido;
    this.visibleNotaFiscal = true;
  }

  showDialogTransportadora(numeroPedido: string) {
    this.numeroDoPedido = numeroPedido;
    this.visibleTransportadora = true;
  }

  getUsuarioPorId(idUsuario: number) {
    const usuarios = this.usuarioService.getUsuariosMocado();
    return usuarios.find(usuario => usuario.id === idUsuario);
  }

  calcularRendaGeral(): number {
    let rendaGeral = 0;
    for (const pedido of this.pedidos) {
      rendaGeral += this.calcularValorTotal(pedido);
    }
    return rendaGeral;
  }

  onKeyPress(event: KeyboardEvent): void {
    const allowedCharacters = /[0-9.]/; // Permitir números e ponto (.)
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedCharacters.test(inputChar)) {
      event.preventDefault();
    }
  }

  onValorProdutoInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sanitizedValue = inputValue.replace(/,/g, '.'); // Substituir todas as vírgulas por ponto (.)

    // Verificar se há um valor válido antes de formatar
    if (sanitizedValue !== null && sanitizedValue !== '') {
      const parsedValue = parseFloat(sanitizedValue);
      this.valorMercadoria = isNaN(parsedValue) ? null : parsedValue;
    } else {
      this.valorMercadoria = null;
    }
  }

  togglePessoaFisica() {
    this.pessoaFisica = true;
    this.pessoaJuridica = false;
  }

  togglePessoaJuridica() {
    this.pessoaJuridica = true;
    this.pessoaFisica = false;
  }  

  generateRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
  

  gerarJSON() {

    const jsonPedido = {
      pedido: {
        tipo: "D", 
        numeroCli: "104", 
        vlrMerc: 0, 
        pesoMerc: 0,
      },
      origem: "nome-plataforma",
      remetente: {
        nome: "Loja do João",
        cnpjCpf: "99999999978052",
        endereco: {
          logradouro: "Roque Petroni Júnior",
          numero: "1021",
          complemento: "SL 50A",
          bairro: "Jardim das Acácias",
          cep: "04707000",
          cidade: "São Paulo",
          uf: "SP",
        },
        contato: "Sr. João",
        email: "contato@lojadojoao.com.br",
        telefone: "1170707070",
        celular: "11970707070",
      },
      destinatario: {
        nome: "Maria da Silva",
        cnpjCpf: "", 
        endereco: {
          logradouro: "Rua Dentista Barreto",
          numero: "99",
          complemento: "",
          bairro: "Vila Carrão",
          cep: "03420000",
          cidade: "São Paulo",
          uf: "SP",
        },
        contato: "Maria",
        email: "maria70707070@gmail.com",
        telefone: "", 
        celular: "1160606060",
      },
      produtos: [] as Caixa[], 
      referencia: "kangu_R_30227267999958_3_02472064000110",
      servicos: ["P", "R"],
    };
  
    for (let i = 0; i < this.quantidadeCaixas; i++) {
      const caixa: Caixa = {
        peso: this.pesoVolume[i],
        altura: this.alturaVolume[i],
        largura: this.larguraVolume[i],
        comprimento: this.compVolume[i],
        tipo: this.tipoVolumeSelecionado[i].caracter,
        produto: this.nomeConteudoVolume[i],
        valor: this.valorConteudoVolume[i],
        quantidade: 1, // Defina a quantidade apropriada
      };
      jsonPedido.produtos.push(caixa);
    }
  
    console.log(JSON.stringify(jsonPedido, null, 2));
  }
 
}






