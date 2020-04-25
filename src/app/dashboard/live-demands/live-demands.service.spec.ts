import { TestBed } from '@angular/core/testing';

import { LiveDemandsService } from './live-demands.service';

describe('LiveDemandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveDemandsService = TestBed.get(LiveDemandsService);
    expect(service).toBeTruthy();
  });
});
