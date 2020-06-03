import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetasPage } from './metas.page';

describe('MetasPage', () => {
  let component: MetasPage;
  let fixture: ComponentFixture<MetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
