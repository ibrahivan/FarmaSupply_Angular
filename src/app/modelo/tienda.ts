import { Pedido } from "./pedido";

export interface Tienda {
  id?: string;
  nombreTienda: string;
  direccionTienda: string;
  codigopostalTienda: string;
  propietarioTiendaId: string
  misPedidos?: Pedido[];
}
