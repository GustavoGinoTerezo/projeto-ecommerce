import { Component } from '@angular/core';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; // Importe jsPDF dessa forma
import 'jspdf-autotable'; // Importe jspdf-autotable
import { Produtos } from 'src/app/services/serviceCategorias/service-categorias.service';

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

  constructor(private pedidoService: ServicePedidoService) {}

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

  exportPdfAll() {
    const doc = new jsPDF();
    const columns = this.exportColumns.map(col => col.title);
    const exportData = this.generateExportData(this.pedidos);

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
    }

    doc.save('pedidos.pdf');
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
    }

    const fileName = pedido ? `pedido_${pedido.numeroPedido}.pdf` : 'pedidos.pdf';
    doc.save(fileName);
  }



}






