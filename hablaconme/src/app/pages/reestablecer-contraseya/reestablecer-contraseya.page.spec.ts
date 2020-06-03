import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestablecerContraseyaPage } from './reestablecer-contraseya.page';

describe('ReestablecerContraseyaPage', () => {
  let component: ReestablecerContraseyaPage;
  let fixture: ComponentFixture<ReestablecerContraseyaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReestablecerContraseyaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestablecerContraseyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
