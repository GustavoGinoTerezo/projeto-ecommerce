import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiEmailsService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) {}

  buscarEmails() {
    const endpoint = "emails";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  atualizarEmails(emailID: number, novosDados: any) {
    const endpoint = `emails/${emailID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.put<any>(url, novosDados);
  }

  excluirEmails(emailID: number) {
    const endpoint = `emails/${emailID}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
