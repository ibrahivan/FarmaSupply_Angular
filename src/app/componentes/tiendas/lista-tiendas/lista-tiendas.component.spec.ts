import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiendasComponent } from './lista-tiendas.component';

describe('ListaTiendasComponent', () => {
  let component: ListaTiendasComponent;
  let fixture: ComponentFixture<ListaTiendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTiendasComponent]
    });
    fixture = TestBed.createComponent(ListaTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
