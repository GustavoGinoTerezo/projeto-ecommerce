import { Component } from '@angular/core';
import { ServiceUsuarioLogadoService, Usuario } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  usuario: Usuario[] = [];
  first: number = 0;
  rows: number = 3;
  dialogVisible: boolean = false;
  dialogVisibleSalvar: boolean = false;
  dialogType: 'email' | 'senha' = 'email';
  newEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private usuarioService: ServiceUsuarioLogadoService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  calculateTotalRecords(): number {
    let total = 0;
    for (const usuario of this.usuario) {
      total += usuario.enderecoEntrega?.length || 0;
    }
    return total;
  }

  showDialog(type: 'email' | 'senha') {
    this.dialogType = type;
    this.dialogVisible = true;
    this.dialogVisibleSalvar = false;
  }

  showDialogSalvar() {
    this.dialogVisible = false;
    this.dialogVisibleSalvar = true;
  }

  alterarDados() {
    // Implemente a lógica para alterar o email ou a senha aqui
    // Use this.dialogType para distinguir entre email e senha
    // Feche o diálogo quando a alteração for concluída
    this.dialogVisible = false;
  }

}
