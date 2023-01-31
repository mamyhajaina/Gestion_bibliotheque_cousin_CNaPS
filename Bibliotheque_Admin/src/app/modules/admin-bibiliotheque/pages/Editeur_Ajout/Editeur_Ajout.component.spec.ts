/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Editeur_AjoutComponent } from './Editeur_Ajout.component';

describe('Editeur_AjoutComponent', () => {
  let component: Editeur_AjoutComponent;
  let fixture: ComponentFixture<Editeur_AjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Editeur_AjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Editeur_AjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
