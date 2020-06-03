import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFechaPage } from './modificar-fecha.page';

describe('ModificarFechaPage', () => {
  let component: ModificarFechaPage;
  let fixture: ComponentFixture<ModificarFechaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarFechaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
