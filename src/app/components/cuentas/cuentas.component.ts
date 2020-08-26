import { Component, OnInit } from '@angular/core';
import { CuentasdataService } from '../../services/cuentasdata.service'
import { Tipodocumento } from '../../modelos/tipodocumento'
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FormBuilder} from '@angular/forms'

import { Clientes } from '../../modelos/clientes' 
import { Cuentas } from '../../modelos/cuentas' 
import { Sucursal } from '../../modelos/sucursal' 
import { Tipocuenta } from '../../modelos/tipocuenta' 

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  desabilita:boolean=false;
  clientes:Clientes[];
  cuentas:Cuentas[];
  sucursal:Sucursal[];
  tipocuenta:Tipocuenta[];
// para detalle
  regdit:any=[];
  arraydet:any=new Array();
  cuentaDetalle:any=[];

  model1:Cuentas=new Cuentas;
  metodoadd:boolean=true;
  metodoact:boolean=false;
  verdetalle:boolean=false;

//constructor 
  constructor(private _valcuenta:CuentasdataService) { 
    this._valcuenta.getCuentas()
    .subscribe(cuenta=>{
      this.cuentas=cuenta;
    });
    // traemos los tipos de cuenta para ser cargados en el select
    this._valcuenta.gettipocuenta()
    .subscribe(ticuenta=>{
      this.tipocuenta=ticuenta;
    });
    // traemos las sucursales para ser cargados en el select
    this._valcuenta.getsucursal()
    .subscribe(tisucursal=>{
      this.sucursal=tisucursal;
    });
    // traemos los clientes para ser cargados en el select
    this._valcuenta.getClientes()
    .subscribe(cliente=>{
      this.clientes=cliente;
    });    
    this.desabilita=false;

  }
  ngOnInit(): void {
  }

  addcuentas(event){
    event.preventDefault();
      this._valcuenta.addcuentas(this.model1)
      .subscribe(cuenta=>{
      this.cuentas.push(cuenta)
      this.metodoadd=true;
      this.metodoact=false;
      this.desabilita=false;
      this.model1=new Cuentas();
    });
  }

  borracuentas(id)
  {
    const pacientes=this.clientes;
    this._valcuenta.erasecuentas(id)
    .subscribe(data=>{
      if (data)
      {
        for(let i=0;i<this.clientes.length;i++)
        {
          if(this.clientes[i].id==id)
          {
            this.clientes.splice(i,1);
          }
        }

      }
      this.metodoadd=true;
      this.metodoact=false;
      this.desabilita=false;
    });
  }

  editcuentas(i){
    this.model1=this.cuentas[i];
    this.metodoadd=false;
    this.metodoact=true;
    this.desabilita=true;
  }

  updatecuentas()
  {
    this._valcuenta.editcuentas(this.model1)
    .subscribe(data=>{
        for(let i=0;i<this.cuentas.length;i++)
        {
          if(this.cuentas[i].id==this.model1.id)
          {
            this.cuentas[i]=data;
          }
        }
      });
      this.metodoadd=true;
      this.metodoact=false;
      this.desabilita=false;
      this.model1=new Cuentas();
  }
  listcuentas(id)
  {
    this.arraydet=new Array();
    this.verdetalle=true;
    this._valcuenta.getcuentasdetalle(id)
    .subscribe(cuenta=>{
      this.cuentaDetalle=cuenta;
      for (let i=0;i<this.cuentaDetalle.doctorPacientes.length;i++)
        {
          this.regdit={"nombredoctor":this.cuentaDetalle.doctorPacientes[i].doctor.nombreCompleto,
                          "especialidad":this.cuentaDetalle.doctorPacientes[i].doctor.especialidad,
                              "doctorid":this.cuentaDetalle.doctorPacientes[i].doctor.id,
                            "pacienteid":25};
            this.arraydet.push(this.regdit);
      }
    });
  }
}
