import { Injectable } from '@angular/core';
import { CatalogoProducto } from '../modelo/catalogo-producto';
import { BaseDatosService } from './base-datos.service';

import { Pedido } from '../modelo/pedido';
import { Tienda } from '../modelo/tienda';





@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private productosFarmaceuticos: CatalogoProducto[] = [
    // Aquí irían los datos de los productos
    {
    
      nombre: "Paracetamol",
      descripcion: "Analgesico y antipirético",
      cantidad: 3,
      precioUnitario: 5.99
    },
    {
     
      nombre: "Ibuprofeno",
      descripcion: "Antiinflamatorio no esteroideo",
      cantidad: 2,
      precioUnitario: 7.49,
     
      
    },
    {
    
      nombre: "Omeprazol",
      descripcion: "Inhibidor de la bomba de protones",
      cantidad: 5,
      precioUnitario: 9.99,
    
    },
    {
     
      nombre: "Aspirina",
      descripcion: "Analgésico, antiinflamatorio y antipirético",
      cantidad: 15,
      precioUnitario: 3.99
    },
    {
      
      nombre: "Amoxicilina",
      descripcion: "Antibiótico del grupo de las penicilinas",
      cantidad: 2,
      precioUnitario: 12.99,
     
    },
    {
     
      nombre: "Cetirizina",
      descripcion: "Antihistamínico",
      cantidad: 3,
      precioUnitario: 8.49
    },
  ];
  
  constructor(private baseDatosServicio: BaseDatosService, ) { 
    
  }

  
  obtenerProductos(): CatalogoProducto[] {
    return this.productosFarmaceuticos;
  }
  realizarPedido(pedido: Pedido, productos: CatalogoProducto[]): Promise<void> {
    // Agregar la lista de productos al pedido
    pedido.listaPedidoCatalogo = this.obtenerProductos();

    // Insertar el nuevo pedido en la base de datos
    return this.baseDatosServicio.insertar('pedidos', pedido)
      .then(() => console.log('Pedido realizado correctamente'))
      .catch(error => console.error('Error al realizar el pedido: ', error));
  }
}
