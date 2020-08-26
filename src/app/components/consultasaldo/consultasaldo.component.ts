import { Component, OnInit } from '@angular/core';
import { CuentasdataService } from '../../services/cuentasdata.service'
import { MovimientosdataService } from '../../services/movimientosdata.service'

import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms'

import { Clientes } from '../../modelos/clientes'
import { Cuentas } from '../../modelos/cuentas'
import { Sucursal } from '../../modelos/sucursal'
import { Tipocuenta } from '../../modelos/tipocuenta'
import { Movimientos } from '../../modelos/movimientos'
import { Tipodocumento } from '../../modelos/tipodocumento'
import { Tipomovimiento } from 'src/app/modelos/tipomovimiento';
import { FnumeroPipe } from '../../pipe/fnumero.pipe'
import * as moment from 'moment';

@Component({
  selector: 'app-consultasaldo',
  templateUrl: './consultasaldo.component.html',
  styleUrls: ['./consultasaldo.component.css']
})
export class ConsultasaldoComponent implements OnInit {
  tipomovimiento: Tipomovimiento[];
  desabilita: boolean = false;
  movimientos: Movimientos[];
  clientes: Clientes[];
  cuentas: Cuentas[];
  sucursal: Sucursal[];
  tipocuenta: Tipocuenta[];
  // para detalle
  regdit: any = [];
  arraydet: any = new Array();
  cuentaDetalle: any = [];
  nombrecliente: string = "";
  cedulacliente: string = "";
  mensaje: string = "";

  model4: Movimientos = new Movimientos;
  metodoadd: boolean = true;
  metodoact: boolean = false;
  verdetalle: boolean = false;
  // para el filtro
  fechai: Date = new Date;
  fechaf: Date = new Date;
  fechaic: string;
  fechafc: string;

  //constructor 
  constructor(private _valmovimientos: MovimientosdataService) {
    // traemos los tipos de cuenta para ser cargados en el select
    this.movimientos=[];
    this._valmovimientos.gettipocuenta()
      .subscribe(ticuenta => {
        this.tipocuenta = ticuenta;
      });
    // traemos las sucursales para ser cargados en el select
    this._valmovimientos.getsucursal()
      .subscribe(tisucursal => {
        this.sucursal = tisucursal;
      });
    // traemos los clientes para ser cargados en el select
    this._valmovimientos.getClientes()
      .subscribe(cliente => {
        this.clientes = cliente;
      });

    // traemos los tipos de movimientos
    this._valmovimientos.gettipomovimientos()
      .subscribe(movimien => {
        this.tipomovimiento = movimien;
      });
    // traemos las cuentas para ser cargados en el select
    this._valmovimientos.getCuentas()
      .subscribe(cuenta => {
        this.cuentas = cuenta;
      });

    this.desabilita = false;
  }
  ngOnInit(): void {
  }

  consultarmvto(numerocta,f1,f2) {
    //this.movimientos=[];
    console.log("entramos a validar ....")
    this.verdetalle = false;
    event.preventDefault();
    this._valmovimientos.getmovimientosDetalle(numerocta, f1, f2)
      .subscribe(movimi => {
        this.movimientos = movimi;
        if (this.movimientos.length > 0) 
        {
          this.verdetalle = true;
        }
        else 
        {
          this.verdetalle = false;
        }
      });
  }

  addmovimientos(event) {
    event.preventDefault();
    if (this.model4.valorMovimiento > 0) {
      this._valmovimientos.addmovimientos(this.model4)
        .subscribe(movimi => {
          this.movimientos.push(movimi)
          this.metodoadd = true;
          this.metodoact = false;
          this.desabilita = false;
          this.model4 = new Movimientos();
          // reacrgamos de nuevo las cuentas al afectarlas de alguna forma
          // traemos las cuentas para ser cargados en el select
          this.cuentas = []
          this._valmovimientos.getCuentas()
            .subscribe(cuenta => {
              this.cuentas = cuenta;
            });
        });
      this.mensaje = ""
    }
    else {
      this.mensaje = "El Valor del Movimiento No puede ser cero "
    }
  }

  borramovimientos(id) {
    const movimientos = this.movimientos;
    this._valmovimientos.erasemovimientos(id)
      .subscribe(data => {
        if (data) {
          for (let i = 0; i < this.movimientos.length; i++) {
            if (this.movimientos[i].id == id) {
              this.movimientos.splice(i, 1);
            }
          }
        }
        this.metodoadd = true;
        this.metodoact = false;
        this.desabilita = false;
      });
  }

  editmovimientos(i) {
    this.model4 = this.movimientos[i];
    this.metodoadd = false;
    this.metodoact = true;
    this.desabilita = true;
  }
  traerdatos(nocuenta) {
    for (let i = 0; i < this.cuentas.length; i++) {
      if (this.cuentas[i].id == nocuenta) {
        this.cedulacliente = this.cuentas[i].clienteId
        this.model4.tipoCuentaId = this.cuentas[i].tipoCuentaId
        this.model4.saldoAnterior = this.cuentas[i].saldoActual
      }
    }

    for (let y = 0; y < this.clientes.length; y++) {
      if (this.clientes[y].id.trim() == this.cedulacliente.trim()) {
        this.nombrecliente = this.clientes[y].nombreCompleto.toString()
      }
    }
  }

  validedatos(movId, valmovi, valsaldo) {
    for (let i = 0; i < this.tipomovimiento.length; i++) {
      if (this.tipomovimiento[i].id == movId) {
        this.model4.tipoAfectacionSuma = this.tipomovimiento[i].tipoAfectacionSuma
        if (!this.tipomovimiento[i].tipoAfectacionSuma) {
          if (valmovi > valsaldo) {
            this.model4.valorMovimiento = 0;
            this.mensaje = "El Valor del Movimiento excede el Saldo "
          } else {
            this.model4.nuevoSaldo = (valsaldo - valmovi);
            this.mensaje = ""
          }
        } else {
          this.model4.nuevoSaldo = (valsaldo + valmovi);
          this.mensaje = ""
        }
      }
    }
  }


  updatemovimientos() {
    this._valmovimientos.editmovimientos(this.model4)
      .subscribe(data => {
        for (let i = 0; i < this.movimientos.length; i++) {
          if (this.movimientos[i].id == this.model4.id) {
            this.movimientos[i] = data;
          }
        }
      });
    this.metodoadd = true;
    this.metodoact = false;
    this.desabilita = false;
    this.model4 = new Movimientos();
  }
  listmovimientos(id) {
    this.arraydet = new Array();
    this.verdetalle = true;
    this._valmovimientos.getmovimientosdetalle(id)
      .subscribe(cuenta => {
        this.cuentaDetalle = cuenta;
        for (let i = 0; i < this.cuentaDetalle.doctorPacientes.length; i++) {
          this.regdit = {
            "nombredoctor": this.cuentaDetalle.doctorPacientes[i].doctor.nombreCompleto,
            "especialidad": this.cuentaDetalle.doctorPacientes[i].doctor.especialidad,
            "doctorid": this.cuentaDetalle.doctorPacientes[i].doctor.id,
            "pacienteid": 25
          };
          this.arraydet.push(this.regdit);
        }
      });
  }
}
