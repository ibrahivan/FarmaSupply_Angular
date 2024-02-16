import { Usuario } from 'src/app/modelo/usuario';
import { BaseDatosService } from './../../../servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/modelo/tienda';
import { TiendaService } from 'src/app/servicios/tienda.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';



@Component({
  selector: 'app-registro-tienda',
  templateUrl: './registro-tienda.component.html',
  styleUrls: ['./registro-tienda.component.css'],
})
export class RegistroTiendaComponent {
  propietarioTiendaId: string = ''; 

  constructor(
    private tiendaService: TiendaService,
    private route: ActivatedRoute,
    private notificacionesServicio :NotificacionesService,
    private baseDatosServicio: BaseDatosService,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propietarioTiendaId = this.route.snapshot.paramMap.get('id') || '';
  }

  tienda: Tienda = {
    nombreTienda: '',
    direccionTienda: '',
    codigopostalTienda: '',
    propietarioTiendaId: this.propietarioTiendaId,
    
  };


  submitForm() {
    this.tiendaService
      .registrarTienda(this.tienda, this.propietarioTiendaId)
      .then(() => {
        console.log('Tienda registrada correctamente');
        this.notificacionesServicio.mostrarNotificacion("Tienda registrada con éxito", "Su nueva tienda ha sido registrada en el sistema", "success");
        this.router.navigate(['/tiendas/mis-tiendas']);
      })
      .catch((error) => {
        console.error('Error al registrar la tienda:', error);
      });

      const usuario: Usuario = this.usuarioServicio.obtenerUsuarioDeLocalStorage();
      if(usuario){
        if(usuario.misTiendas){
          usuario.misTiendas.push(this.tienda);
        }else{
          usuario.misTiendas = [this.tienda];
        }
        this.baseDatosServicio.actualizar('usuarios', usuario).then(() => {
            console.log('Usuario actualizado correctamente');
          }
        );
      }
  }
  
  

}