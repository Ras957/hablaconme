import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenMetasPage } from './imagen-metas.page';

describe('ImagenMetasPage', () => {
  let component: ImagenMetasPage;
  let fixture: ComponentFixture<ImagenMetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenMetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenMetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
