/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RenouvellementService } from './renouvellement.service';

describe('Service: Renouvellement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenouvellementService]
    });
  });

  it('should ...', inject([RenouvellementService], (service: RenouvellementService) => {
    expect(service).toBeTruthy();
  }));
});
