import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/modelo/pedido';
import { Tienda } from 'src/app/modelo/tienda';
import { Usuario } from 'src/app/modelo/usuario';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { TiendaService } from 'src/app/servicios/tienda.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  usuarioActual: Usuario | undefined;
  misTiendas: Tienda[] = [];
  tiendaSeleccionada: Tienda | undefined;
  pedidos: Pedido[] = [];

  constructor(
    private tiendaService: TiendaService,
    private router: Router,
    private usuarioServicio: UsuarioService,
    private notificacionesServicio: NotificacionesService,
    private injector: Injector
  ) {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
  }

  ngOnInit(): void {
    if (this.usuarioActual !== undefined && this.usuarioActual.id !== undefined) {
      this.tiendaService.obtenerMisTiendas(this.usuarioActual.id).subscribe(
        (data: Tienda[]) => {
          this.misTiendas = data;
        }
      );
    }
  }

  cargarPedidos(idTienda: string): void {
    const pedidoService = this.injector.get(PedidoService); // Obtener instancia de PedidoService
    pedidoService.obtenerPedidosPorTienda(idTienda).subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
      (error: any) => {
        console.error('Error al cargar pedidos:', error);
      }
    );
  }
}
