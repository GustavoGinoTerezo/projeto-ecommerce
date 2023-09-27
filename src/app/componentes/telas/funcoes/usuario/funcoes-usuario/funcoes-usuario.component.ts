import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';
import { navbarData } from './nav-data';
import { ServiceUsuarioLogadoService } from 'src/app/services/serviceUsuarioLogado/service-usuario-logado.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-funcoes-usuario',
  templateUrl: './funcoes-usuario.component.html',
  styleUrls: ['./funcoes-usuario.component.css'],
  animations: [
    fadeInOut,
  ]
})

export class FuncoesUsuarioComponent {

  constructor(
    private router: Router,
    private mostrarLateraisService: ServiceUsuarioLogadoService,
    ){}

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  abrirLateral(): void{
    this.collapsed = true;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  fecharLateral(): void {
    this.collapsed = false;
  }


  handleItemClick(item: INavbarData): void {
    if (item.action) {
      // Verifica se a propriedade 'action' existe no item e, se existir, a executa
      item.action();
    }

    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  logout(route: string) {
    this.router.navigate([route]);
    this.mostrarLateraisService.setMostrarLateralUsuario(false);
    this.mostrarLateraisService.setMostrarLateralAdministrador(false);

    sessionStorage.removeItem('t')
    sessionStorage.removeItem('u')
    sessionStorage.removeItem('c')
    sessionStorage.removeItem('lu')
    sessionStorage.removeItem('la')
    sessionStorage.removeItem('p')
    sessionStorage.removeItem('at')
    sessionStorage.removeItem('es')

  }

}
