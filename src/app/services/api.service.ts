import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postCliente(data: any) {
    return this.http.post<any>("http://localhost:3000/clientesListado/", data);
  }
  getClientes() {
    return this.http.get<any>("http://localhost:3000/clientesListado/");
  }
  putCliente(data: any, id : number) {
    return this.http.put<any>("http://localhost:3000/clientesListado/"+id, data);
  }
  eliminarCliente(id : number) {
    return this.http.delete<any>("http://localhost:3000/clientesListado/"+id);
  }

  // obtenerClientes() {
  //   return this.http.get<any>("https://agency-coda.uc.r.appspot.com/client/list");
  // }
}
