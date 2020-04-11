import { TestBed } from '@angular/core/testing';

import { HaveppeService } from './haveppe.service';

describe('NeedppeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HaveppeService = TestBed.get(HaveppeService);
    expect(service).toBeTruthy();
  });
});
