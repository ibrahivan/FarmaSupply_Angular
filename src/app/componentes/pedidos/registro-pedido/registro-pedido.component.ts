import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogoProducto } from 'src/app/modelo/catalogo-producto';
import { Pedido } from 'src/app/modelo/pedido';
import { Tienda } from 'src/app/modelo/tienda';
import { PedidoService } from 'src/app/servicios/pedido.service';


@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.component.html',
  styleUrls: ['./registro-pedido.component.css']
})
export class RegistroPedidosComponent implements OnInit {
  tiendaActualId: string = '';
  tiendaActual: Tienda | undefined;
  productosDisponibles$: Observable<CatalogoProducto[]> | undefined;
  productosSeleccionados: CatalogoProducto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
   
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.tiendaActualId = this.route.snapshot.paramMap.get('id') || '';
    this.tiendaActual = this.route.snapshot.data['tienda'];
    this.productosDisponibles$ = this.pedidoService.obtenerProductosDelPedido();
  }

  toggleProducto(producto: CatalogoProducto, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
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
    if (this.tiendaActual && this.productosSeleccionados.length > 0) {
      const pedido: Pedido = {
        tiendaDelPedidoId: this.tiendaActualId,
        listaPedidoCatalogo: this.productosSeleccionados,
        precioPedido: this.calcularPrecioTotal()
      };
      this.pedidoService.realizarPedido(pedido, this.tiendaActualId).then(() => {
        console.log('Pedido realizado correctamente');
        // Redireccionar o mostrar mensaje de éxito
      }).catch(error => {
        console.error('Error al realizar el pedido: ', error);
        // Manejar el error
      });
    } else {
      console.error('Error: No se puede realizar el pedido porque no se ha seleccionado una tienda o productos.');
      // Manejar el error
    }
  }

  calcularPrecioTotal(): number {
    return this.productosSeleccionados.reduce((total, producto) => total + producto.precioUnitario, 0);
  }
}
