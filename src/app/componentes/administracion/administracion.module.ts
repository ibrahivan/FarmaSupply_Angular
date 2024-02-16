import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { DetalleUsuarioComponent } from './detalle-usuarios/detalle-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministracionComponent,
    DetalleUsuarioComponent,
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministracionModule { }
