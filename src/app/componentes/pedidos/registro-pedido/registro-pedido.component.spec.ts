import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPedidosComponent } from './registro-pedido.component';

describe('RegistroPedidoComponent', () => {
  let component: RegistroPedidosComponent;
  let fixture: ComponentFixture<RegistroPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPedidosComponent]
    });
    fixture = TestBed.createComponent(RegistroPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
