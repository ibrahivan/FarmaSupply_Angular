import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BienvenidaComponent } from './core/bienvenida/bienvenida.component';
import { MenuComponent } from './core/menu/menu.component';
import { FooterComponent } from './core/footer/footer.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { AutentificacionComponent } from './componentes/autentificacion/autentificacion.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    MenuComponent,
    FooterComponent,
    AdministracionComponent,
    AutentificacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"farmasupply-d5167","appId":"1:587632884021:web:a94ef7dc92636b9208f47c","storageBucket":"farmasupply-d5167.appspot.com","apiKey":"AIzaSyAnW_yeiZFlsYxtRokZNTl-DHPUr5HoZi4","authDomain":"farmasupply-d5167.firebaseapp.com","messagingSenderId":"587632884021","measurementId":"G-5C5J3K716S"})),
    provideFirestore(() => getFirestore()),
    NgbModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
