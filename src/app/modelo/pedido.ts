import { CatalogoProducto } from "./catalogo-producto";

import { Usuario } from "./usuario";

export interface Pedido {
  idPedido?: string;
  listaPedidoCatalogo?: CatalogoProducto[] | null;
  propietarioPedidoId: Usuario | null;

}
