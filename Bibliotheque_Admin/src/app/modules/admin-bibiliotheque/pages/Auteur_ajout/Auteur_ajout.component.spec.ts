/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Auteur_ajoutComponent } from './Auteur_ajout.component';

describe('Auteur_ajoutComponent', () => {
  let component: Auteur_ajoutComponent;
  let fixture: ComponentFixture<Auteur_ajoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Auteur_ajoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Auteur_ajoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
