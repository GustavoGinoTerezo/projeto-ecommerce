import { Component } from '@angular/core';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; // Importe jsPDF dessa forma
import 'jspdf-autotable'; // Importe jspdf-autotable
import { Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';
import { ServiceUsuariosService } from 'src/app/services/serviceUsuarios/service-usuarios.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-relatorios-de-vendas',
  templateUrl: './relatorios-de-vendas.component.html',
  styleUrls: ['./relatorios-de-vendas.component.css']
})
export class RelatoriosDeVendasComponent {

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
  visible: boolean = false;
  selectedProductImages: any[] = [];
  numeroDoPedido!: string;

  constructor(
    private pedidoService: ServicePedidoService,
    private usuarioService: ServiceUsuariosService
    ) {}

  ngOnInit() {
    this.pedidos = this.pedidoService.getPedido();

    this.exportColumns = this.cols.map((col) => ({ title: col.customExportHeader || col.header, dataKey: col.field }));
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
          exportItem.emailCliente = usuario.email || '';
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
        exportItem.ruaCliente = pedido.enderecoSelecionado[0].rua || '';
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

  showDialog(numeroPedido: string) {
    this.numeroDoPedido = numeroPedido;
    this.visible = true;
  }

  getUsuarioPorId(idUsuario: number) {
    const usuarios = this.usuarioService.getUsuarios();
    return usuarios.find(usuario => usuario.id === idUsuario);
  }

  calcularRendaGeral(): number {
    let rendaGeral = 0;
    for (const pedido of this.pedidos) {
      rendaGeral += this.calcularValorTotal(pedido);
    }
    return rendaGeral;
  }

}






