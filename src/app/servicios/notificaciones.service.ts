import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseDatosService } from './base-datos.service';
import { Usuario } from '../modelo/usuario';
import { Router } from '@angular/router';
import { Tienda } from '../modelo/tienda';


@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  constructor(
    private _baseDatosService: BaseDatosService,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) {}

  /**
   * Muestra una ventana modal de notificación para el usuario.
   * @param titulo titulo del modal
   * @param mensaje mensaje que se muestra en el cuerpo del modal
   * @param tipo tipo del modal a mostrar
   */
  mostrarNotificacion(titulo: string, mensaje: string, tipo: any) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
    });
  }

  confirmarLogout() {
    Swal.fire({
      title: '¿Estás seguro de que deseas cerrar sesión?',
      text: 'Serás redirigido a la página de bienvenida.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServicio
          .logout()
          .then(() => {
            this.router.navigate(['']);
          })
          .catch((error) => console.log(error));
      } else {
        console.log('Logout cancelado');
      }
    });
  }

  /**
   * Muestra una confirmación para eliminar un elemento y realiza la acción si es confirmada.
   * @param {string} id - Identificador único del elemento a eliminar.
   * @param {string} nombre - Nombre del elemento a eliminar.
   * @param {string} elementoEliminar - Tipo de elemento que se va a eliminar.
   * @param {string} coleccion - Nombre de la colección en la base de datos.
   * @param {any} objetoAEliminar  - el objeto a eliminar
   */
  confirmarEliminarUsuario(
    id: string,
    nombre: string,
    elementoEliminar: string,
    coleccion: string,
    objetoAEliminar: any
  ) {
    Swal.fire({
      title: `¿Estás seguro de eliminar ${elementoEliminar} ${nombre}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3366ff',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el administrador confirma eliminar usuario, se realiza la
        // eliminación en firestore y en firebaseAuth del usuario
        this._baseDatosService
          .eliminar(coleccion, id)
          .then(() => {
            console.log(`${elementoEliminar} eliminado`);
            this.usuarioServicio.borrarUsuario(objetoAEliminar);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire(
          // Muestra una notificación de éxito
          '¡Acción completada!',
          `${elementoEliminar} se ha eliminado con exito.`,
          'success'
        );
      }
    });
  }
  confirmarEliminarTienda(
    id: string,
    nombreTienda: string,
    direccionTienda: string,
    coleccion: string,
    misTiendas: Tienda[],
    propietario: Usuario | undefined
  ) {
    Swal.fire({
      title: `¿Estás seguro de eliminar la tienda ${nombreTienda}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3366ff',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma eliminar la tienda, se realiza la eliminación en firestore y se actualiza el array
        // de tiendas del usuario a través del servicio Firebase
        const indiceDeLaTienda = misTiendas.findIndex(tienda => tienda.id === id);
        if (indiceDeLaTienda !== -1) {
          misTiendas.splice(indiceDeLaTienda, 1);
        }
        console.log(misTiendas);
        this._baseDatosService.eliminar(coleccion, id)
          .then(() => {
            console.log(`Tienda eliminada correctamente de la colección ${coleccion}`);
            if (propietario !== undefined) {
              propietario.misTiendas = misTiendas;
              this._baseDatosService.actualizar('usuarios', propietario)
                .then(() => console.log('Actualizado usuario eliminando la tienda del array misTiendas'))
                .catch((error) => console.log('Error al actualizar el usuario:', error));
            }
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire(
          // Muestra una notificación de éxito
          '¡Acción completada!',
          `La tienda ${nombreTienda} se ha eliminado con éxito.`,
          'success'
        );
      }
    });
  }
  
}