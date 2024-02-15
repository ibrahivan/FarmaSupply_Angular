import { Injectable } from '@angular/core';
import { CatalogoProducto } from '../modelo/catalogo-producto';
import { BaseDatosService } from './base-datos.service';
import { Usuario } from '../modelo/usuario';
import { Pedido } from '../modelo/pedido';
import { PedidosComponent } from '../componentes/pedidos/pedidos.component';




@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private productosFarmaceuticos: CatalogoProducto[] = [
    // Aquí irían los datos de los productos
    {
      idProducto: 1,
      nombre: "Paracetamol",
      descripcion: "Analgesico y antipirético",
      cantidad: 3,
      precioUnitario: 5.99
    },
    {
      idProducto: 2,
      nombre: "Ibuprofeno",
      descripcion: "Antiinflamatorio no esteroideo",
      cantidad: 2,
      precioUnitario: 7.49,
     
      
    },
    {
      idProducto: 3,
      nombre: "Omeprazol",
      descripcion: "Inhibidor de la bomba de protones",
      cantidad: 5,
      precioUnitario: 9.99,
    
    },
    {
      idProducto: 4,
      nombre: "Aspirina",
      descripcion: "Analgésico, antiinflamatorio y antipirético",
      cantidad: 15,
      precioUnitario: 3.99
    },
    {
      idProducto: 5,
      nombre: "Amoxicilina",
      descripcion: "Antibiótico del grupo de las penicilinas",
      cantidad: 2,
      precioUnitario: 12.99,
     
    },
    {
      idProducto: 6,
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
  realizarPedido(usuario: Usuario): Promise<void> {
    // Obtener los productos predefinidos del servicio
    const productos = this.obtenerProductos();

    // Crear el nuevo pedido con los productos predefinidos y el total
    const nuevoPedido: Pedido = {
      listaPedidoCatalogo: productos,
      propietarioPedidoId: usuario,
      
    };
      // Insertar el nuevo pedido en la base de datos
      return this.baseDatosServicio.insertar('pedidos', nuevoPedido)
      .then(() => {
        console.log('Pedido realizado correctamente');
      })
      .catch(error => {
        console.error('Error al realizar el pedido: ', error);
      });

  }
}
