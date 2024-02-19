import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pedidos.component';
import { RegistroPedidoComponent } from './registro-pedido/registro-pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

const routes: Routes = [
  { path: '', component: PedidosComponent, children:[
    { path: 'mis-pedidos', component: ListaPedidosComponent },
    { path: 'realizar-pedido/:id', component: RegistroPedidoComponent },
  ] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
