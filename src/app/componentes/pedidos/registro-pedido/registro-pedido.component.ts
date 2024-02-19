import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pedido } from 'src/app/modelo/pedido';
import { Tienda } from 'src/app/modelo/tienda';

import { PedidoService } from 'src/app/servicios/pedido.service';


@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.component.html',
  styleUrls: ['./registro-pedido.component.css']
})
export class RegistroPedidoComponent {
  tiendaDelPedidoId: string='';
  precioTotal: number = 0;
  cantidadProductosSeleccionados: any;
  
  
  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private tienda: Tienda
  ){}
  ngOnInit(): void {
    this.tiendaDelPedidoId = this.route.snapshot.paramMap.get('id') || '';
    
  }
  productos =this.pedidoService.obtenerProductos()
  realizarPedido(): void {
    // Calcular el precio total del pedido
    this.precioTotal = 0;
    for (const producto of this.productos) {
      const cantidadSeleccionada = this.cantidadProductosSeleccionados[producto.id] || 0;
      this.precioTotal += cantidadSeleccionada * producto.precioUnitario;
    }
    // Validar que se haya seleccionado al menos un producto
    const productosSeleccionados = this.productos.filter(producto => this.cantidadProductosSeleccionados[producto.id]);
    if (productosSeleccionados.length === 0) {
      console.error('Error: Debes seleccionar al menos un producto para realizar el pedido.');
      return;
    }
    
  
    // Crear el nuevo pedido
    const nuevoPedido: Pedido = {
      tiendaDelPedidoId: this.tiendaDelPedidoId,
      precioPedido: this.precioTotal,
      listaPedidoCatalogo: productosSeleccionados
    };
  
    // Llamar al servicio para realizar el pedido
    this.pedidoService.realizarPedido(nuevoPedido, this.productos)
      .then(() => {
        console.log('Pedido realizado correctamente.');
        // Reiniciar la selección de productos
        this.cantidadProductosSeleccionados = {};
        this.precioTotal = 0;
      })
      .catch(error => {
        console.error('Error al realizar el pedido:', error);
      });
    }
}