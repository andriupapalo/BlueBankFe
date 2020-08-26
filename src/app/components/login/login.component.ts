import { Component, OnInit } from '@angular/core';
import { LogindataService } from '../../services/logindata.service'
import { Clientes } from '../../modelos/clientes'
import { FormsModule } from '@angular/forms';
import { newArray } from '@angular/compiler/src/util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clave:string='0000';
  objcliente:any={};
  clientesbase:Clientes[]=new Array();
  model1:Clientes=new Clientes;
  islogued:boolean=false;
  constructor(private _login:LogindataService) 
  { 
    clientes:[]=new Array();
  }

  ngOnInit(): void {
  }
  
  getbyidcli(id)
  {
    this._login.getbyid(id)
    .subscribe(clien=>{
      this.objcliente=clien
      this.clientesbase.push(this.objcliente)
      this.clave=this.clientesbase[0].claveWeb.toString()
      //Object.keys(this.clientes).map(function(key, index) {
      //  console.log(key);
    //});
    });
  }

  validaclave()
  {
    console.log("vamos a comparar "+this.model1.claveWeb+"  con esto "+this.clave)
    if (this.model1.claveWeb==this.clave)
    {
      this.islogued=true;
      console.log("si encontrado");
    }else{
      this.islogued=false;
      console.log("No encontrado");
    }
  }
}
