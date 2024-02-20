import { Injectable } from '@angular/core';
import { CatalogoProducto } from '../modelo/catalogo-producto';
import { BaseDatosService } from './base-datos.service';
import { Pedido } from '../modelo/pedido';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private baseDatosServicio: BaseDatosService) { }
  
  obtenerProductosDelPedido(): Observable<CatalogoProducto[]> {
    // Aquí deberías obtener los productos del catálogo que están en los pedidos
    return this.baseDatosServicio.obtenerTodos('catalogoProductos').pipe(
      map((pedidos: Pedido[]) => {
        const productos: CatalogoProducto[] = [];
        pedidos.forEach(pedido => {
          pedido.listaPedidoCatalogo?.forEach(producto => {
            productos.push(producto);
          });
        });
        return productos;
      })
    );
  }

  realizarPedido(pedido: Pedido, tiendaDelPedidoId: string )  : Promise<DocumentReference> {
    pedido.tiendaDelPedidoId = tiendaDelPedidoId;
    return this.baseDatosServicio.insertar('pedidos', pedido);
    
  }
}
