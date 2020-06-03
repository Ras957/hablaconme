import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyadirEditarMetasPage } from './ayadir-editar-metas.page';

describe('AyadirEditarMetasPage', () => {
  let component: AyadirEditarMetasPage;
  let fixture: ComponentFixture<AyadirEditarMetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyadirEditarMetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyadirEditarMetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
