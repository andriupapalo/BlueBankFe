import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Clientes } from '../modelos/clientes'
import { Cuentas } from '../modelos/cuentas'
import { Tipocuenta } from '../modelos/tipocuenta'
import { Sucursal } from '../modelos/sucursal'
import { Movimientos } from '../modelos/movimientos'
import * as moment from 'moment';

import 'rxjs/add/operator/map';
import { Tipomovimiento } from '../modelos/tipomovimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientosdataService {
  url: string = "http://localhost:64780/api/Movimientos";
  constructor(private http: HttpClient) { }

  getmovimientosDetalle(ncuenta,fecha1,fecha2)
  {
    console.log("cuenta no...."+ncuenta);
    console.log("cuenta no...."+moment(fecha1).format('YYYY-MM-DD 23:59'));
    console.log("cuenta no...."+moment(fecha2).format('YYYY-MM-DD 23:59'));
    return this.http.get<Movimientos[]>(`${this.url}/Detalle/?nocuenta=${ncuenta}&fecha1=${moment(fecha1).format('YYYY-MM-DD 00:00')}&fecha2=${moment(fecha2).format('YYYY-MM-DD 23:59')}`)
      .map(res => res);
  }

  getmovimientos() {
    return this.http.get<Movimientos[]>(`${this.url}`)
      .map(res => res);
  }
  getmovimientosbyid(id) {
    return this.http.get<Movimientos[]>(`${this.url}/${id}`)
      .map(res => res);
  }

  addmovimientos(newcuentas: Movimientos) {
    return this.http.post<Movimientos>(`${this.url}`, newcuentas)
      .map(res => res);
  }

  editmovimientos(newcuentas: Movimientos) {
    return this.http.put<Movimientos>(`${this.url}/${newcuentas.id}`, newcuentas)
      .map(res => res);
  }

  erasemovimientos(id) {
    return this.http.delete<Movimientos>(`${this.url}/${id}`)
      .map(res => res);
  }

  getmovimientosdetalle(id) {
    return this.http.get(`${this.url}/Detalle/${id}`)
      .map(res => res);
  }

  gettipocuenta() {
    return this.http.get<Tipocuenta[]>("http://localhost:64780/api/Cuentas/TipoCuenta")
      .map(res => res);
  }

  getsucursal() {
    return this.http.get<Sucursal[]>("http://localhost:64780/api/Cuentas/Sucursal")
      .map(res => res);
  }

  getClientes() {
    return this.http.get<Clientes[]>("http://localhost:64780/api/Clientes")
      .map(res => res);
  }
  gettipomovimientos() {
    return this.http.get<Tipomovimiento[]>(`${this.url}/TipoMovimiento`)
      .map(res => res);
  }
  
  getCuentas() {
    return this.http.get<Cuentas[]>("http://localhost:64780/api/Cuentas")
      .map(res => res);
  }


}
