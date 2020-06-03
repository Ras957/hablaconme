import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraSesionPage } from './primera-sesion.page';

describe('PrimeraSesionPage', () => {
  let component: PrimeraSesionPage;
  let fixture: ComponentFixture<PrimeraSesionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeraSesionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeraSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
