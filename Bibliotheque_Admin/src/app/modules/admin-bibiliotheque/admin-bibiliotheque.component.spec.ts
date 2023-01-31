import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBibiliothequeComponent } from './admin-bibiliotheque.component';

describe('AdminBibiliothequeComponent', () => {
  let component: AdminBibiliothequeComponent;
  let fixture: ComponentFixture<AdminBibiliothequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBibiliothequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBibiliothequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
