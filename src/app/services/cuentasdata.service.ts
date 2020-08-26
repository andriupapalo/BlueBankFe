import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Clientes } from '../modelos/clientes'
import { Cuentas } from '../modelos/cuentas'
import { Tipocuenta } from '../modelos/tipocuenta'
import { Sucursal } from '../modelos/sucursal'


import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CuentasdataService {
  url: string = "http://localhost:64780/api/Cuentas";
  constructor(private http: HttpClient) { }

  getCuentas() {
    return this.http.get<Cuentas[]>(`${this.url}`)
      .map(res => res);
  }
  getCuentasbyid(id) {
    return this.http.get<Cuentas[]>(`${this.url}/${id}`)
      .map(res => res);
  }

  addcuentas(newcuentas: Cuentas) {
    return this.http.post<Cuentas>(`${this.url}`, newcuentas)
      .map(res => res);
  }

  editcuentas(newcuentas: Cuentas) {
    return this.http.put<Cuentas>(`${this.url}/${newcuentas.id}`, newcuentas)
      .map(res => res);
  }

  erasecuentas(id) {
    return this.http.delete<Cuentas>(`${this.url}/${id}`)
      .map(res => res);
  }

  getcuentasdetalle(id) {
    return this.http.get(`${this.url}/Detalle/${id}`)
      .map(res => res);
  }

  gettipocuenta() {
    return this.http.get<Tipocuenta[]>(`${this.url}/TipoCuenta`)
      .map(res => res);
  }

  getsucursal() {
    return this.http.get<Sucursal[]>(`${this.url}/Sucursal`)
      .map(res => res);
  }

  getClientes() {
    return this.http.get<Clientes[]>("http://localhost:64780/api/Clientes")
      .map(res => res);
  }
}
