import { animate, style, transition, trigger } from "@angular/animations";

export interface INavbarData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
  action?: () => void; // Propriedade action opcional
}

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate('500ms',
      style({opacity: 1})
    )
  ]),
  transition(':leave', [
    style({opacity: '1'}),
    animate('0ms',
      style({opacity: 0})
    )
  ])
])
