import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab10Page } from './tab10.page';

describe('Tab10Page', () => {
  let component: Tab10Page;
  let fixture: ComponentFixture<Tab10Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab10Page],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab10Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
