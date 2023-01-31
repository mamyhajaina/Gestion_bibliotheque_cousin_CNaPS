/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MouvementService } from './mouvement.service';

describe('Service: Mouvement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MouvementService]
    });
  });

  it('should ...', inject([MouvementService], (service: MouvementService) => {
    expect(service).toBeTruthy();
  }));
});
