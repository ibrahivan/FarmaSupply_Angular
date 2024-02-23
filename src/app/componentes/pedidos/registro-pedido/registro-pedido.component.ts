import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CatalogoProducto } from 'src/app/modelo/catalogo-producto';
import { Pedido } from 'src/app/modelo/pedido';
import { Tienda } from 'src/app/modelo/tienda';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TiendaService } from 'src/app/servicios/tienda.service';

@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.component.html',
  styleUrls: ['./registro-pedido.component.css']
})
export class RegistroPedidosComponent implements OnInit {
  tiendaActualId: string = '';
  productosDisponibles$: Observable<CatalogoProducto[]> | undefined;
  productosSeleccionados: CatalogoProducto[] = [];
  nombreTienda: Observable<string> | undefined;

  constructor(
    private baseDatosServicio: BaseDatosService,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router,
    private tiendaService: TiendaService,
    private notificacionesServicio: NotificacionesService
  ) { }

  ngOnInit(): void {
    // Obtener el ID de la tienda actual
    this.tiendaActualId = this.route.snapshot.paramMap.get('id') || '';
    // Obtener el nombre de la tienda actual
    this.nombreTienda = this.baseDatosServicio.obtenerPorId('tiendas', this.tiendaActualId)
      .pipe(
        map((tienda: Tienda) => tienda.nombreTienda)
      );
    // Obtener los productos disponibles
    this.productosDisponibles$ = this.baseDatosServicio.obtenerTodos('catalogoProductos');
  }

  toggleProducto(producto: CatalogoProducto, event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Agregar el producto a la lista de productos seleccionados
      this.productosSeleccionados.push(producto);
    } else {
      // Eliminar el producto de la lista de productos seleccionados
      const index = this.productosSeleccionados.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.productosSeleccionados.splice(index, 1);
      }
    }
  }
  

  realizarPedido(): void {
    if (this.tiendaActualId && this.productosSeleccionados.length > 0) {
      const nuevoPedido: Pedido = {
        tiendaDelPedidoId: this.tiendaActualId,
        listaPedidoCatalogo: this.productosSeleccionados,
        precioPedido: this.calcularPrecioTotal(this.productosSeleccionados),
      };
  
      // Llamar al servicio para realizar el pedido
      this.pedidoService.realizarPedido(nuevoPedido, this.tiendaActualId, this.productosSeleccionados)
        .then(() => {
          console.log('Pedido realizado correctamente');
          this.notificacionesServicio.mostrarNotificacion("Pedido realizado con éxito", "El pedido ha sido registrado en el sistema", "success");
          this.router.navigate(['/tiendas/mis-tiendas']);
        })
        .catch(error => {
          console.error('Error al realizar el pedido:', error);
          this.notificacionesServicio.mostrarNotificacion("Error al realizar el pedido", "Por favor, inténtalo de nuevo más tarde", "error");
        });
         // Agregar el pedido a la lista de pedidos de la tienda
      const tienda: Tienda = this.tiendaService.obtenerTiendaDeLocalStorage();
      if (tienda) {
        if (tienda.misPedidos) {
          tienda.misPedidos.push(nuevoPedido);
        } else {
          tienda.misPedidos = [nuevoPedido];
        }
        this.baseDatosServicio.actualizar('tiendas', tienda).then(() => {
          console.log('Tienda actualizada correctamente');
        });
      }
    } else {
      console.error('Error: No se puede realizar el pedido porque no se ha seleccionado una tienda o productos.');
      this.notificacionesServicio.mostrarNotificacion("Error al realizar el pedido", "Por favor, selecciona una tienda y al menos un producto", "error");
    }
  }
  

  calcularPrecioTotal(productos: CatalogoProducto[]): number {
    // Convertir los precios unitarios a números y luego sumarlos
    return productos.reduce((total, producto) => total + (parseFloat(String(producto.precioUnitario * producto.cantidad)) || 0), 0);  
}
}