import { Injectable } from '@angular/core';
import { CatalogoProducto } from '../modelo/catalogo-producto';
import { BaseDatosService } from './base-datos.service';
import { Pedido } from '../modelo/pedido';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedidos: any;

  constructor(private baseDatosServicio: BaseDatosService, private fs: AngularFirestore) { }

  obtenerPedidosPorTienda(idTienda: string): Observable<Pedido[]> {
    return this.fs.collection<Pedido>('pedidos', ref => ref.where('tiendaDelPedidoId', '==', idTienda)).valueChanges();
  }
 
  realizarPedido(pedido: Pedido, tiendaDelPedidoId: string, productosSeleccionados: CatalogoProducto[]): Promise<any> {
    // Asignar la tienda del pedido
    pedido.tiendaDelPedidoId = tiendaDelPedidoId;
    // Asignar los productos seleccionados al pedido
    pedido.listaPedidoCatalogo = productosSeleccionados;
    // Insertar el nuevo pedido en la base de datos
    return new Promise<void>((resolve, reject) => {
      this.baseDatosServicio.insertar('pedidos', pedido)
        .then((docRef: any) => {
          console.log('Pedido realizado correctamente. Documento referencia:', docRef);
          resolve(docRef);
        })
        .catch((error: any) => {
          console.error('Error al realizar el pedido: ', error);
          reject(error);
        });
    });
  }

 
}
