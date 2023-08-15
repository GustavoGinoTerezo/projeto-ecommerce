import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  acaoDoBotao() {
    // Lógica que deve ser executada quando o botão for clicado
    console.log('Botão flutuante clicado!');
  }
}
