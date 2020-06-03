import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeAdminPage } from './mensaje-admin.page';

describe('MensajeAdminPage', () => {
  let component: MensajeAdminPage;
  let fixture: ComponentFixture<MensajeAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
