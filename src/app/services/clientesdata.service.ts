import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Clientes } from '../modelos/clientes'
import { Tipodocumento } from '../modelos/tipodocumento'

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ClientesdataService {
  url:string="http://localhost:64780/api/Clientes";
  constructor(private http:HttpClient) { }

  getClientes()
{
  return this.http.get<Clientes[]>(`${this.url}`)
  .map(res=>res);
}
getClientesbyid(id)
{
  return this.http.get<Clientes[]>(`${this.url}/${id}`)
  .map(res=>res);
}

addclientes(newcliente:Clientes){
  return this.http.post<Clientes>(`${this.url}`,newcliente)
  .map(res=>res);
}

editclientes(newcliente:Clientes){
return this.http.put<Clientes>(`${this.url}/${newcliente.id}`,newcliente)
.map(res=>res);
}

eraseclientes(id){
  return this.http.delete<Clientes>(`${this.url}/${id}`)
  .map(res=>res);
 }

 getclientedetalle(id)
 {
  return this.http.get(`${this.url}/Detalle/${id}`)
  .map(res=>res);
 }
 gettipodocumento()
 {
   return this.http.get<Tipodocumento[]>(`${this.url}/TipoDocumento`)
   .map(res=>res);
 }
}
