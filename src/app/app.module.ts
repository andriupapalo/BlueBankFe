import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule,HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http'

import { LogInterceptorService } from './services/log-interceptor.service';
import { AccountService } from './services/account.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { MenuComponent } from './components/menu/menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { FnumeroPipe } from './pipe/fnumero.pipe';
import { ConsultasaldoComponent } from './components/consultasaldo/consultasaldo.component';
import { RouterModule,Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent} from './components/register/register.component'

const rutas:Routes=[
  { path: '',pathMatch:'full',component:InicioComponent},
  { path: 'register-login',component : RegisterComponent},
  { path: 'inicio',component : InicioComponent},
  { path: 'menu',component : MenuComponent},
  { path: 'clientes',component : ClientesComponent},
  { path: 'cuentas',component : CuentasComponent},
  { path: 'movimientos',component : MovimientosComponent, canActivate:[AuthGuardService]},
  { path: 'consultasaldo',component : ConsultasaldoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    CuentasComponent,
    MovimientosComponent,
    MenuComponent,
    FnumeroPipe,
    ConsultasaldoComponent,
    InicioComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas,{
      enableTracing:true,
      paramsInheritanceStrategy:'always',
      useHash:true 
    })
  ],
  providers: [AuthGuardService,
    HttpClient,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
