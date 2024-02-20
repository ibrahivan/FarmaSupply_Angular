import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { RegistroPedidosComponent } from './registro-pedido/registro-pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidosComponent,
    RegistroPedidosComponent,
    ListaPedidosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule
  ]
})
export class PedidosModule { }
