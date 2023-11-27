import { Injectable } from '@angular/core';
import { ServiceUrlGlobalService } from '../serviceUrlGlobal/service-url-global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiBannerService {

  constructor(
    private urlGlobal: ServiceUrlGlobalService,
    private http: HttpClient,
  ) { }

  //================================================//

  buscarFotosBanners() {
    const endpoint = "banner";
    const url = this.urlGlobal.url + endpoint;
    return this.http.get<any[]>(url);
  }

  cadastrarFotosBanner(data: FormData) {
    const endpoint = "banner";
    const url = this.urlGlobal.url + endpoint;
    return this.http.post<any>(url, data);
  }

  excluirFotosBanner(bannerId: number) {
    const endpoint = `banner/${bannerId}`;
    const url = this.urlGlobal.url + endpoint;
    return this.http.delete<any>(url);
  }
}
