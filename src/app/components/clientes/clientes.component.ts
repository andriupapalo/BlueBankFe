import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../modelos/clientes'
import { ClientesdataService } from '../../services/clientesdata.service'
import { Tipodocumento } from '../../modelos/tipodocumento'
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  // declaracion validadores para el formulario
  /*form =new FormGroup({
  id:new FormControl('',Validators.required),
  documentoId:new FormControl('',[Validators.required,Validators.minLength(6)]),
  nombreCompleto:new FormControl('',[Validators.required,Validators.minLength(5)]),
  direccionResidencia:new FormControl('',[Validators.required,Validators.minLength(10)]),
  telefonoContacto:new FormControl('',[Validators.required,Validators.minLength(7)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  claveWeb:new FormControl('',[Validators.required,Validators.minLength(3)]),
  edad:new FormControl('',Validators.required),
  sexo:new FormControl('',[Validators.required,Validators.maxLength(1)])
})*/
  tipodocumento: any[]
  clientes: Clientes[];
  regdit: any = [];
  arraydet: any = new Array();
  paciDetalle: any = [];
  model: Clientes = new Clientes;
  metodoadd: boolean = true;
  metodoact: boolean = false;
  verdetalle: boolean = false;
  objaux: any = new Array();
  mensaje: string = "";

  //constructor 
  constructor(private _valcli: ClientesdataService) {
    this._valcli.getClientes()
      .subscribe(paciente => {
        this.clientes = paciente;
      });
    // traemos los tipos de documentos para ser cargados en el select
    this._valcli.gettipodocumento()
      .subscribe(tipdoc => {
        this.tipodocumento = tipdoc;
      });
  }
  ngOnInit(): void {
  }

  addclientes(event) {
    event.preventDefault();
    if (this.model.sexo == "M" || this.model.sexo == "M") {
      this.mensaje = ""
      this._valcli.addclientes(this.model)
        .subscribe(pacient => {
          this.clientes.push(pacient)
          this.metodoadd = true;
          this.metodoact = false;
          this.model = new Clientes();
        });
    } else {
      this.mensaje = "Dato erroneo sexo, corrijalo por favor"
    }
  }

  borracliente(id) {
    const pacientes = this.clientes;
    this._valcli.eraseclientes(id)
      .subscribe(data => {
        if (data) {
          for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].id == id) {
              this.clientes.splice(i, 1);
            }
          }

        }
        this.metodoadd = true;
        this.metodoact = false;
      });
  }

  editcliente(i) {
    this.model = this.clientes[i];
    console.log("objeto :  " + this.clientes[i])
    console.log("objeto valores :  " + Object.values(this.clientes[i]))
    this.metodoadd = false;
    this.metodoact = true;
  }
  updateclientes() {
    this._valcli.editclientes(this.model)
      .subscribe(data => {
        for (let i = 0; i < this.clientes.length; i++) {
          if (this.clientes[i].id == this.model.id) {
            this.clientes[i] = data;
          }
        }
      });
    this.metodoadd = true;
    this.metodoact = false;
    this.model = new Clientes();
  }
  listclientes(id) {
    this.arraydet = new Array();
    this.verdetalle = true;
    this._valcli.getclientedetalle(id)
      .subscribe(pacidet => {
        this.paciDetalle = pacidet;
        for (let i = 0; i < this.paciDetalle.doctorPacientes.length; i++) {
          this.regdit = {
            "nombredoctor": this.paciDetalle.doctorPacientes[i].doctor.nombreCompleto,
            "especialidad": this.paciDetalle.doctorPacientes[i].doctor.especialidad,
            "doctorid": this.paciDetalle.doctorPacientes[i].doctor.id,
            "pacienteid": 25
          };
          this.arraydet.push(this.regdit);
        }
      });
  }
}
