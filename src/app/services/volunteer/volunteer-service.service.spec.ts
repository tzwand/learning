import { TestBed } from '@angular/core/testing';

import { VolunteerServiceService } from './volunteer-service.service';

describe('VolunteerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteerServiceService = TestBed.get(VolunteerServiceService);
    expect(service).toBeTruthy();
  });
});
