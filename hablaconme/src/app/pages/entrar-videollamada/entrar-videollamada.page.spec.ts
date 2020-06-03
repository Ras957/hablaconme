import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrarVideollamadaPage } from './entrar-videollamada.page';

describe('EntrarVideollamadaPage', () => {
  let component: EntrarVideollamadaPage;
  let fixture: ComponentFixture<EntrarVideollamadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrarVideollamadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrarVideollamadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
