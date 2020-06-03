import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarDatosSolicitudPage } from './borrar-datos-solicitud.page';

describe('BorrarDatosSolicitudPage', () => {
  let component: BorrarDatosSolicitudPage;
  let fixture: ComponentFixture<BorrarDatosSolicitudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarDatosSolicitudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarDatosSolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
