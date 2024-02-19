import { Component, Input, OnInit } from '@angular/core';
import { CatalogoProducto } from 'src/app/modelo/catalogo-producto';
import { Pedido } from 'src/app/modelo/pedido';
import { Tienda } from 'src/app/modelo/tienda';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { TiendaService } from 'src/app/servicios/tienda.service';

@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.component.html',
  styleUrls: ['./registro-pedido.component.css']
})
export class RegistroPedidoComponent implements OnInit {
  tienda!: Tienda;
  productos!: CatalogoProducto[];

  constructor(private pedidoService: PedidoService, private tiendaService: TiendaService) { }

  ngOnInit(): void {
    // Aquí deberías obtener la tienda actual y los productos disponibles del catálogo
    // Esto puede ser a través de un servicio que obtenga los datos de Firebase
    this.tienda = this.tiendaService.obtenerMisTiendas(); // Obtener la tienda actual
    this.productos = this.pedidoService.obtenerProductos(); // Obtener los productos disponibles del catálogo
  }

  realizarPedido(): void {
    const nuevoPedido: Pedido = {
      tiendaDelPedidoId: this.tienda.id,
      precioPedido: 0,
    };

    this.pedidoService.realizarPedido(nuevoPedido, this.productos)
      .then(() => {
        // Manejar el éxito del pedido
      })
      .catch(error => {
        // Manejar el error al realizar el pedido
      });
  }
}