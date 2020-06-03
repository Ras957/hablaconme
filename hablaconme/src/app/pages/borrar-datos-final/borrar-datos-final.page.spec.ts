import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarDatosFinalPage } from './borrar-datos-final.page';

describe('BorrarDatosFinalPage', () => {
  let component: BorrarDatosFinalPage;
  let fixture: ComponentFixture<BorrarDatosFinalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarDatosFinalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarDatosFinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
