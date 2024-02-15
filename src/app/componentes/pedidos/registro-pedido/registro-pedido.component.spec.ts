import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPedidoComponent } from './registro-pedido.component';

describe('RegistroPedidoComponent', () => {
  let component: RegistroPedidoComponent;
  let fixture: ComponentFixture<RegistroPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPedidoComponent]
    });
    fixture = TestBed.createComponent(RegistroPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
