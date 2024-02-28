import { CatalogoProducto } from "./catalogo-producto";


export interface Pedido {
  numeroPedido: string;
  id?: string;
  listaPedidoCatalogo: CatalogoProducto[] ;
  tiendaDelPedidoId: string;
  cantidad?: number;
  precioPedido: number;
  

}
