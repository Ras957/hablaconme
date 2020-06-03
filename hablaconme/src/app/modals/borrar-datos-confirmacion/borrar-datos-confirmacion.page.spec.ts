import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarDatosConfirmacionPage } from './borrar-datos-confirmacion.page';

describe('BorrarDatosConfirmacionPage', () => {
  let component: BorrarDatosConfirmacionPage;
  let fixture: ComponentFixture<BorrarDatosConfirmacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarDatosConfirmacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarDatosConfirmacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
