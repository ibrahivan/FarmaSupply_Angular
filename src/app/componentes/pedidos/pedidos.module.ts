import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { RegistroPedidoComponent } from './registro-pedido/registro-pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';


@NgModule({
  declarations: [
    PedidosComponent,
    RegistroPedidoComponent,
    ListaPedidosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
