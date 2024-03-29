import { Usuario } from 'src/app/modelo/usuario';
import { BaseDatosService } from './../../../servicios/base-datos.service';
import { Component } from '@angular/core';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent {
  
  usuarios: Usuario[] = [];

  constructor(
    private notificacionesServicio: NotificacionesService,
    private baseDatosServicio: BaseDatosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.baseDatosServicio
      .obtenerTodos('usuarios')
      .pipe(
        map((usuarios: Usuario[]) => {
          return usuarios.map((usuario) => ({
            ...usuario,
           
          }));
        })
      )
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }


  eliminarUsuario(id: string, email: string) {

    const usuarioAeliminar: Usuario = this.usuarios.find(
      (user) => user.id === id
    )!;

    if(usuarioAeliminar.rol === 'ROLE_ADMIN'){
      this.notificacionesServicio.mostrarNotificacion(
        'Error al eliminar cuenta de usuario',
        'No se puede eliminar un usuario con privilegios de administrador',
        'error'
      )
      return;
    }

    this.notificacionesServicio.confirmarEliminarUsuario(
      id,
      email,
      'usuario',
      'usuarios',
      usuarioAeliminar
    );
  }
  navegarARegistro() {
    this.router.navigate(['/autenticacion/registrar'], { queryParams: { from: 'admin' } });
  }

  buscarUsuarios() {
     const busqueda = (document.querySelector('input[name="busquedaUser"]') as HTMLInputElement).value;
     const usuariosFiltrados = this.usuarios.filter(usuario => usuario.email.includes(busqueda));
     this.usuarios = usuariosFiltrados;
  }
}