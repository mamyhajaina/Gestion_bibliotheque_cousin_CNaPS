/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OuvrageService } from './Ouvrage.service';

describe('Service: Ouvrage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OuvrageService]
    });
  });

  it('should ...', inject([OuvrageService], (service: OuvrageService) => {
    expect(service).toBeTruthy();
  }));
});
