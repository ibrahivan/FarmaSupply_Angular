import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiendasRoutingModule } from './tiendas-routing.module';
import { TiendasComponent } from './tiendas.component';
import { ListaTiendasComponent } from './lista-tiendas/lista-tiendas.component';
import { RegistroTiendaComponent } from './registro-tienda/registro-tienda.component';


@NgModule({
  declarations: [
    TiendasComponent,
    ListaTiendasComponent,
    RegistroTiendaComponent
    
  ],
  imports: [
    CommonModule,
    TiendasRoutingModule,
    FormsModule
  ]
})
export class TiendasModule { }
