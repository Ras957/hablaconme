import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadaPage } from './llamada.page';

describe('LlamadaPage', () => {
  let component: LlamadaPage;
  let fixture: ComponentFixture<LlamadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
