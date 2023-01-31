import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrementOuvrageComponent } from './enregistrement-ouvrage.component';

describe('EnregistrementOuvrageComponent', () => {
  let component: EnregistrementOuvrageComponent;
  let fixture: ComponentFixture<EnregistrementOuvrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnregistrementOuvrageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrementOuvrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
