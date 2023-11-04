// admin.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AES } from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class GuardaRotaAdmin {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const a4e21fcb21ced0f0bf2b03794e2dd121ad1d6e780749f413985b40b416e34dd1 = 'c6cac15e687c642f42ac6259a8a9fbb12fb6f33b8c72c1491c20d3f539ba3992';

    const authToken = sessionStorage.getItem('at');

    const bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601 = sessionStorage.getItem('t');

    if (bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601) {
      const f63694ef33b2bbd387c5399a54d2e5eb062d27e2a1518d0b0cae6c65c39f805a = CryptoJS.AES.decrypt(bdc3dbdf44be45645eab34ef107f5d585a25e40288a9cc83edc0fdf8330b8601, a4e21fcb21ced0f0bf2b03794e2dd121ad1d6e780749f413985b40b416e34dd1);

      // Verifique se a descriptografia foi bem-sucedida
        if (f63694ef33b2bbd387c5399a54d2e5eb062d27e2a1518d0b0cae6c65c39f805a.sigBytes > 0) {
            const tpUsuario = parseInt(f63694ef33b2bbd387c5399a54d2e5eb062d27e2a1518d0b0cae6c65c39f805a.toString(CryptoJS.enc.Utf8), 10); // 

            if (tpUsuario === 1 && authToken) {
                return true; // Permite o acesso à rota administrativa
                } else {
                this.router.navigate(['/login']); // Redireciona para a tela de login se o valor de tpusuario não for igual a 1
                return false; // Não permite o acesso à rota administrativa
                }
        } else {
            this.router.navigate(['/login']);
        }  
    }

    return false;
  }
}
