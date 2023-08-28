import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-funcoes-administrador',
  templateUrl: './funcoes-administrador.component.html',
  styleUrls: ['./funcoes-administrador.component.css'],
  animations: [
    fadeInOut,
  ]
})
export class FuncoesAdministradorComponent {

  constructor(
    private router: Router,){}

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;


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

}
