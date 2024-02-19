import { CatalogoProducto } from "./catalogo-producto";


export interface Pedido {
  id?: string;
  listaPedidoCatalogo?: CatalogoProducto[] 
  tiendaDelPedidoId: string;
  precioPedido: number;
  

}
