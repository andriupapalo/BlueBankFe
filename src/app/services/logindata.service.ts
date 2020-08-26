import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Clientes} from '../modelos/clientes'

@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  url:string="http://localhost:64780/api/Clientes";
  constructor(private http:HttpClient) { }
//
  getbyid(id)
  {
    return this.http.get<Clientes[]>(`${this.url}/${id}`)
    .map(res=>res);
  }

}
