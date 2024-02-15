import { Injectable } from '@angular/core';
import { Tienda } from '../modelo/tienda';
import { BaseDatosService } from './base-datos.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private baseDatosServicio: BaseDatosService) { }

  obtenerMisTiendas(propietarioTiendaId: string): Observable<Tienda[]> {
    return this.baseDatosServicio.obtenerPorFiltro('motos', 'propietarioTiendaId', propietarioTiendaId);
  }
  
  registrarTienda(tienda: Tienda, propietarioTiendaId: string )  : Promise<DocumentReference> {
    tienda.propietarioTiendaId = propietarioTiendaId;
    return this.baseDatosServicio.insertar('tiendas', tienda);
    
  }
}
