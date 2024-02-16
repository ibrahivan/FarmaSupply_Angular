import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tienda } from 'src/app/modelo/tienda';
import { Usuario } from 'src/app/modelo/usuario';
import { TiendaService } from 'src/app/servicios/tienda.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-tiendas',
  templateUrl: './lista-tiendas.component.html',
  styleUrls: ['./lista-tiendas.component.css'],
})
export class ListaTiendasComponent {
  usuarioActual: Usuario | undefined;
  misTiendas: Tienda[] = [];

  constructor(
    private tiendaService: TiendaService,
    private router: Router,
    private usuarioServicio: UsuarioService,
    private notificacionesServicio: NotificacionesService
  ) {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
  }

  ngOnInit(): void {
    if(this.usuarioActual!==undefined && this.usuarioActual.id !== undefined) {
      this.tiendaService.obtenerMisTiendas(this.usuarioActual.id).subscribe(
        (data: Tienda[]) => {
          this.misTiendas = data;
        }
      );
    }
  }

  confirmarEliminarTienda(id: string, nombre: string, direccion: string) {
    const tiendaAeliminar: Tienda= this.misTiendas.find(
      (tienda) => tienda.id === id
    )!;

    this.notificacionesServicio.confirmarEliminarTienda(
      id,
      nombre,
      direccion,
      'tiendas',
      this.misTiendas,
      this.usuarioActual
    );
  }
}