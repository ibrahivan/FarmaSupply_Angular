import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pedidos.component';

import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ListaTiendasComponent } from '../tiendas/lista-tiendas/lista-tiendas.component';
import { RegistroPedidosComponent } from './registro-pedido/registro-pedido.component';

const routes: Routes = [
  { path: '', component: PedidosComponent, children:[
    { path: 'mis-pedidos', component: ListaPedidosComponent },
    { path: 'registro-pedido/:id', component: RegistroPedidosComponent },
    { path: 'mis-tiendas', component: ListaTiendasComponent },
  ] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
