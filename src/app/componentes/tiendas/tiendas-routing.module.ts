import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendasComponent } from './tiendas.component';
import { ListaTiendasComponent } from './lista-tiendas/lista-tiendas.component';
import { RegistroTiendaComponent } from './registro-tienda/registro-tienda.component';

const routes: Routes = [
  { path: '', component: TiendasComponent, children:[
    { path: 'mis-tiendas', component: ListaTiendasComponent },
    { path: 'registrar-tienda/:id', component: RegistroTiendaComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendasRoutingModule { }
