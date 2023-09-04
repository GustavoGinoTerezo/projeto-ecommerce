import { Component } from '@angular/core';
import { CarrinhoDeCompra } from 'src/app/services/serviceCarrinhoDeCompras/service-carrinho-de-compras.service';
import { Pedido, ServicePedidoService } from 'src/app/services/servicePedido/service-pedido.service';
import * as FileSaver from 'file-saver';

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
  cols!: Column[];
  exportColumns!: ExportColumn[];


  constructor(private pedidoService: ServicePedidoService) {}

  ngOnInit() {

    this.pedidos = this.pedidoService.getPedido();

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

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


  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.pedidos);
            doc.save('pedidos.pdf');
        });
    });
  }

  exportExcel() {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.pedidos);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, 'pedidos');
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
