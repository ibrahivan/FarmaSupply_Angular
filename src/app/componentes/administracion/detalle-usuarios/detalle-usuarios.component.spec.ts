import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioComponent } from './detalle-usuarios.component';

describe('DetalleUsuariosComponent', () => {
  let component: DetalleUsuarioComponent;
  let fixture: ComponentFixture<DetalleUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleUsuarioComponent]
    });
    fixture = TestBed.createComponent(DetalleUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
